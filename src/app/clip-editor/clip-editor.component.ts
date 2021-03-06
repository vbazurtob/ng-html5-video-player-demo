import { Component, OnInit , Input, EventEmitter, Output, ViewChild} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { isClipRangeValid } from '../validators/clip-range.validator';

/*
Author: Voltaire Bazurto
Component responsible to render the clip edit form that will be used for creating/editing clips.
I use reactive forms with validators. I created a custom validator for checking if the starting clip nativeElement
is lower than the ending clip time.
*/

@Component({
  selector: 'app-clip-editor',
  templateUrl: './clip-editor.component.html',
  styleUrls: ['./clip-editor.component.scss']
})
export class ClipEditorComponent implements OnInit {

  @Input() videoDuration;
  @Input() frmTitle;
  @Output() addClip = new EventEmitter();
  @Output() cancelClip = new EventEmitter();
  @Output() editClip = new EventEmitter();

  @ViewChild("btnEdit") btnEdit;
  @ViewChild("btnAdd") btnAdd;
  @ViewChild("btnCancel") btnCancel;
  @ViewChild("currentEditClip") currentEditClip;

  public frmClipEditor: FormGroup;

  constructor( private formBuilder: FormBuilder ) {


  }

  get frm(){
     return this.frmClipEditor.controls;
  }

  ngOnInit() {
    this.frmClipEditor = this.formBuilder.group({
            name: ['', Validators.required],
            start: ['', [Validators.required, Validators.min(0), Validators.max(this.videoDuration)] ],
            end: ['', [Validators.required,  Validators.min(0), Validators.max(this.videoDuration)]]
        },
         { validator: isClipRangeValid }
      );
  }

  public updateValidatorsWithMaxDuration(maxValue){
    this.videoDuration = maxValue;
    this.frm.start.clearValidators();
    this.frm.start.setValidators( [ Validators.required , Validators.min(0), Validators.max(maxValue)] );
    this.frm['start'].updateValueAndValidity();

    this.frm.end.clearValidators();

    this.frm.end.setValidators( [Validators.required,  Validators.min(0), Validators.max(maxValue)] );
    this.frm['end'].updateValueAndValidity();

  }

  get name(){
    return this.frm.name;
  }

  get start(){
    return this.frm.start;
  }

  get end(){
    return this.frm.end;
  }

  public addClipEvt($evt){

    const frmValues = this.getCurrentFrmValues();
    frmValues['url'] = '';
    frmValues['full'] = false;

    this.addClip.emit(frmValues);
  }

  public isFormValid(){


    return this.frmClipEditor.valid;
  }

  public setFrmValues(frm){
    this.frm['name'].setValue( frm.name );
    this.frm['start'].setValue( frm.start ) ;
    this.frm['end'].setValue( frm.end );
  }


  public getCurrentFrmValues(){
    return {
        "name": this.frm.name.value,
        "start": this.frm.start.value,
        "end": this.frm.end.value
      };
  }

  public applyEditChangesEvt($evt){

    const frmValues = this.getCurrentFrmValues();
    this.editClip.emit(frmValues);

  }

  public cancelEditClipEvt($evt){
    this.cancelClip.emit();
  }


  getErrorMessage(fieldName) {
     let message = this.frm[fieldName].hasError('required') ? 'You must enter a value' : '';

     switch( fieldName ){
       case 'start':
       case 'end':
        message = this.frm[fieldName].hasError('min') ? 'Value cannot be lesser than 0' :
          this.frm[fieldName].hasError('max') ? 'Value cannot be greater than ' + this.videoDuration
          :
          this.frm[fieldName].hasError('rangeNotValid')? 'Starting value from the clip cannot be greater or equals than the ending value'
          : ''  ;
       break;
     }

     return message;
  }

  showEditButton(){
    this.btnEdit.nativeElement.style.visibility="visible";
  }

  hideEditButton(){
    this.btnEdit.nativeElement.style.visibility="hidden";

  }

  showAddButton(){
    this.btnAdd.nativeElement.style.visibility="visible";
  }

  hideAddButton(){
    this.btnAdd.nativeElement.style.visibility="hidden";
  }

  showCancelButton(){
    this.btnCancel.nativeElement.style.visibility="visible";
  }

  hideCancelButton(){
    this.btnCancel.nativeElement.style.visibility="hidden";
  }

  setCurrentEditClip(editId){
    this.currentEditClip.nativeElement.value = editId;
  }

  getCurrentEditClip(){
    return this.currentEditClip.nativeElement.value;
  }

}
