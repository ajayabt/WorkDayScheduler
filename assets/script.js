// Show date and time

$('#currentDay').text(dayjs().format('dddd, MMMM D'));


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
  
    