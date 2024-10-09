import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './styles.css';



function PlayerSchedule( {onBack} ){
    const [selectedSlots, setSelectedSlots] = useState([]);


    const handleSelect = (selectionInfo) => {
        const newSlot = {
            start: selectionInfo.start,
            end: selectionInfo.end,
            title: "Available",
            id: `${selectionInfo.start}-${selectionInfo.end}`

        };
        const mergedSlots = mergeSlots(newSlot, selectedSlots)
        setSelectedSlots(mergedSlots)
        // handle time slot selection here
    }

    const mergeSlots = (newSlot, existingSlots) => {
        const updatedSlots = [];
        let hasMerged = false;


        // Check if the new slot overlaps with any existing slots
        for (let slot of existingSlots) {
            if (isTouchingOrOverlapping(newSlot, slot)) {
            // If they overlap, merge the new slot with the existing slot
                newSlot = {
                start: new Date(Math.min(newSlot.start, slot.start)),
                end: new Date(Math.max(newSlot.end, slot.end)),
                title: "Available"
                };
                hasMerged = true; // Indicate that a merge has occurred
            } else {
          // If they don't overlap, keep the existing slot
                updatedSlots.push(slot);
            }
        }

        // If there was a merge, add the merged slot to the list
        if (hasMerged) {
            updatedSlots.push(newSlot);
        } else {
            updatedSlots.push(newSlot); // Add the new slot if no merge occurred
        }
        return updatedSlots;
    };

    const isTouchingOrOverlapping = (newSlot, existingSlot) => {
        return (
          // Overlapping condition: new slot starts before existing ends and ends after existing starts
            (newSlot.start < existingSlot.end && newSlot.end > existingSlot.start) ||
          // Touching condition: new slot starts at or before existing ends and ends at or after existing starts
            (newSlot.start <= existingSlot.end && newSlot.end >= existingSlot.start)
        );
    };

    const handleEventChange = (changeInfo) => {
        const updatedSlots = selectedSlots.map(slot => {
            if (slot.id === changeInfo.event.id) {
                return {
                    ...slot,
                    start: changeInfo.event.start, // Update start time
                    end: changeInfo.event.end, // Update end time
                };
            }
            return slot;
        });

        setSelectedSlots(updatedSlots);
        console.log('Updated slots:', updatedSlots);
    };


    
    return (
        <div>
            <h1>
                <button onClick={onBack}>GoBack</button>
                Player Schedule
                <div className='calendar-container'>
                <FullCalendar plugins={[timeGridPlugin, interactionPlugin]}
                selectable={true}
                nowIndicator={true}
                select={handleSelect}
                initialView='timeGridWeek'
                slotMinTime={"06:00:00"}
                slotMaxTime={"21:00:00"}
                allDayContent={false}
                allDaySlot={false}
                unselectAuto={true} //don't know if I need this.
                selectMirror={true}
                events={selectedSlots}
                eventOverlap={false}
                eventResizableFromStart={true}
                eventResize={handleEventChange}
                editable={true}
                headerToolbar={{
                    left:'',
                    center:'',
                    right:''
                    }
                }
                height={'100%'}
                className="fc"
                
                />
                </div>
            </h1>
            
        </div>
    );
}

export default PlayerSchedule;