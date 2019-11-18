var dragNote;
var targetNote;
var dragColumn;
var targetColumn;

function dblclickNote(){
  $(this).attr('contenteditable','true');
  $(this).attr('draggable','false');
  $(this).focus();
if($(this).children('.deleteButton').length > 0){return}
else{
  let el = document.createElement('div');
    el.setAttribute('contenteditable','false');
    el.setAttribute('draggable','false');
    el.classList.add('deleteButton');
    $(this).append(el);
    $(el).click(function(event){
       event.stopPropagation(); 
       $(this).parent().remove();
    })
  }
}

function blurNote(){
  $(this).attr('contenteditable','false');
  $(this).attr('draggable','true');
  if( $(this).is(':empty')) {
          $(this).remove();
  }
  $('.deleteButton').remove();
}

function dragstartNote(event){
    event.stopPropagation();
    dragNote = this;
    this.classList.add("dragging");
}

function dragenterNote(event){
  event.stopPropagation();
  targetNote = this;
}

function dragendNote(event){
  event.stopPropagation();
  const notes = Array.from(dragNote.parentElement.querySelectorAll('.note'));
  var indextargetNote = notes.indexOf(targetNote);
  var indexdragNote = notes.indexOf(dragNote);
  if(indextargetNote < indexdragNote){
    $(dragNote).insertBefore(targetNote);
  }else{
    $(dragNote).insertAfter(targetNote);
  }
}
/////////////////////////////////////////////
function dragstartColumn(){
  dragColumn = this;
}

function dragenterColumn(){
  targetColumn = this;
}

function dragendColumn(){
  const columns = Array.from(dragColumn.parentElement.querySelectorAll('.column'));
    var indextargetColumn = columns.indexOf(targetColumn);
    var indexdragColumn = columns.indexOf(dragColumn);
    if(indextargetColumn < indexdragColumn){
    $(dragColumn).insertBefore(targetColumn);
  }else{
    $(dragColumn).insertAfter(targetColumn);
  }
}
/////////////////////////////////////////////
function dblclickHeader(){
  $(this).attr('contenteditable','true');
  $(this).parent().attr('draggable','false');
  $(this).focus();
}

function blurHeader(){
  $(this).attr('contenteditable','false');
  $(this).parent().attr('draggable','true');
}
/////////////////////////////////////////////
function addNote(){
  let newNotes = document.createElement('div');
  $(newNotes).attr('contenteditable','true');
  $(newNotes).attr('draggable','false');
  $(newNotes).addClass('note');
  this.parentElement.querySelector('.column-body').append(newNotes);
  addEventNote($(newNotes))
  $(newNotes).focus();
}
/////////////////////////////////////////////
function addColumn(){
  let newColumn = document.createElement('div');
  let newHeader = document.createElement('div');
  let newFooter = document.createElement('div');
  let newBody = document.createElement('div');
  $(newHeader).attr('contenteditable','true');
  $(newColumn).attr('draggable','false');
  $(newHeader).addClass('column-header');
  $(newColumn).addClass('column');
  $(newFooter).addClass('column-footer');
  $(newBody).addClass('column-body');
  $(newBody).css('height', '50px');
  $(newHeader).text('Новый столбец')
  $(newColumn).append(newHeader, newBody,newFooter);
  addEventColumn($(newColumn))
  addEventHeaderColumn($(newHeader))
  addEventFooterColumn($(newFooter))
  $(newColumn).insertBefore(this);
  $(newHeader).focus();
  $(newBody).append(addNote);
}
/////////////////////////////////////////////
function addEventNote(note){
$(note).dblclick(dblclickNote);
$(note).blur(blurNote);
$(note).on('dragstart', dragstartNote);
$(note).on('dragenter', dragenterNote);
$(note).on('dragend',dragendNote);
}
function addEventColumn(column){
$('.column').on('dragstart', dragstartColumn);
$('.column').on('dragenter', dragenterColumn);
$('.column').on('dragend',dragendColumn);
}
function addEventHeaderColumn(headerColumn){
$(headerColumn).dblclick(dblclickHeader);
$(headerColumn).blur(blurHeader);
}
function addEventFooterColumn(footerColumn){
  $(footerColumn).click(addNote);
}
/////////////////////////////////////////////
addEventNote($('.note'))
addEventColumn($('.column'))
addEventHeaderColumn($('.column-header'))
addEventFooterColumn($('.column-footer'))

$('.addColumn').click(addColumn)