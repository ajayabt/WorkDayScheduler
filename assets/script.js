// Show date and time

$('#currentDay').text(dayjs().format('dddd, MMMM D'));

//creating and appending blocks and save button
$(document).ready(function() {
    const businessHoursStart = 9; 
    const businessHoursEnd = 17; 
    const container = $('.container'); 
  
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));
  
    for (let hour = businessHoursStart; hour <= businessHoursEnd; hour++) {
    
      let timeBlock = $('<div>').addClass('row time-block');
 
      let hourCol = $('<div>').addClass('col-2 hour').text(formatHour(hour));
  
      let textareaCol = $('<textarea>').addClass('col-9 description').attr('id', `textarea-${hour}`);
  
     
      let saveBtnCol = $('<button>').addClass('col-1 saveBtn').html('<i class="fas fa-save"></i>').attr('data-hour', hour);
  
      
      timeBlock.append(hourCol, textareaCol, saveBtnCol);
  
      container.append(timeBlock);
    }

    //timeblock colour coding
    $('.time-block').each(function() {
        const blockHour = parseInt($(this).find('.saveBtn').data('hour'));
        const currentHour = dayjs().hour();
    
        if (blockHour < currentHour) {
          $(this).find('textarea').addClass('past');
        } else if (blockHour === currentHour) {
          $(this).find('textarea').addClass('present');
        } else {
          $(this).find('textarea').addClass('future');
        }
    
        // Load from localStorage
        const savedEvent = localStorage.getItem(`event-${blockHour}`);
        if (savedEvent) {
          $(this).find('textarea').val(savedEvent);
        }
      });
    
      // Save button 
      $('.saveBtn').on('click', function() {
        const hour = $(this).data('hour');
        const event = $(`#textarea-${hour}`).val();
      
        // Save to localStorage
        localStorage.setItem(`event-${hour}`, event);
      
        // Save message
        const savedMessage = $('<div>').addClass('save-message').text('Saved!');
        
        $(this).closest('.time-block').append(savedMessage);
      
       
        setTimeout(function() {
          savedMessage.fadeOut('slow', function() { 
            $(this).remove(); 
          });
        }, 2000);
      });
    });
    
    function formatHour(hour) {
      return dayjs().hour(hour).format('h A');
    }