import { Component, OnInit, ViewChild } from '@angular/core';


/*
Author: Voltaire Bazurto
Main app component class. It contains the definition of the default video to be
chunked in clips. By default, sample clips are created when the page is loaded.
*/


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'HTML5 video player using media fragments';
  public maxDurationValue = 0;

  @ViewChild("videoPlayer") videoPlayer;

  @ViewChild("clipFormContainer") clipFormContainer;
  @ViewChild("frmClip") frmClip;
  @ViewChild("errorClipNameTxt") errorClipNameTxt;
  @ViewChild("errorClipStart") errorClipStart;
  @ViewChild("errorClipEnd") errorClipEnd;
  @ViewChild("videoContainerElement") videoContainerElement;


  set _maxDurationValue(val){

    if(this.listVideos.length == 1 && this.maxDurationValue == 0 && !isNaN(val)  ){
      this.maxDurationValue = val; // <= order matters here. thats why duplicated line
      this.createClipsFromVideo();
    }else{
      this.maxDurationValue = val;
    }
  }

  public listVideos = [];
  public frmTitle = "";
  ngOnInit(){

    // init video playlist array
    this.listVideos = [{
     "name": "Blender Demo - Full Video",
     "url": "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
     "full": true,
     "start": 0,
     "end": 0
   }];



    if(this.videoPlayer) {
      const  video = this.videoPlayer.nativeElement;

      // Wait until video metadata is loaded
      video.addEventListener("loadedmetadata", () => {
        // Use a setter to validate that demo clips are created just once
        this._maxDurationValue = video.duration;
        this.frmClip.updateValidatorsWithMaxDuration(this.maxDurationValue);

        this.showVideoContainer();



      });

      //Load First video of playlist
      this.addVideoSrc(this.videoPlayer.nativeElement, this.listVideos[0].url, 'video/mp4');

    }


  }

  public addVideoSrc(video, urlSource, mediatype){
      const source = document.createElement('source');
      source.src = urlSource;
      source.type = mediatype;
      video.appendChild(source);
  }

  public selectClip(evt, idx){
    const selectedClip = evt.target;
    const video = this.videoPlayer.nativeElement;
    video.innerHTML = '';



    this.addVideoSrc(this.videoPlayer.nativeElement, this.listVideos[idx].url, 'video/mp4');
    video.load();
    video.play();


  }

  public addClip( evt ){
    const frm = evt;
    const clipUrl = this.listVideos[0].url + "#t="+ frm.start + "," + frm.end;
    frm.url = clipUrl;

    this.listVideos.push( frm );
    this.hideNewClipUI();
  }

  public editClip(evt, idx){
    const selectedClip = this.listVideos[idx];
    const frmClipContainer = this.clipFormContainer.nativeElement;
    frmClipContainer.style.transform= 'scale(1,1)';
    this.frmClip.setFrmValues( selectedClip );

    this.frmClip.setCurrentEditClip(idx);
    //UI btns
    this.frmClip.hideAddButton();
    this.frmClip.showEditButton();

    this.hideVideoContainer();

    this.frmTitle = "Editing clip: " + selectedClip.name;
  }

  private deleteClip(evt, idx){
    this.listVideos[idx] = null;
    delete this.listVideos[idx];
    this.listVideos = this.listVideos.filter( x => x != null );
  }

  public isClipFullVideo(idx){
    return this.listVideos[idx].full === true;
  }

  public showAddNewClipUI(){
    const frmClipContainer = this.clipFormContainer.nativeElement;
    frmClipContainer.style.transform= 'scale(1,1)';
    const emptyFrm = this.getEmptyFrmObject();
    this.frmClip.setFrmValues( emptyFrm );

    this.hideVideoContainer();

    this.frmClip.showAddButton();
    this.frmClip.hideEditButton();

    this.frmTitle = "Create a new clip";
  }

  public getEmptyFrmObject(){
    return {
      "name": "",
      "url": "",
      "full": false,
      "start": 0,
      "end": 0
    };
  }

  public hideNewClipUI(){
    const frmClip = this.clipFormContainer.nativeElement;
    frmClip.style.transform= 'scale(1,0)';

    //Hide edit button
    this.frmClip.showAddButton();
    this.frmClip.hideEditButton();

    this.showVideoContainer();
  }

  public cancelEditClip($evt){
    this.hideNewClipUI();
  }


  public isMetadataAvailable(){
      return !isNaN(this.videoPlayer.nativeElement.duration);
  }

  public showVideoContainer()
  {
    const videoContainerDOM = this.videoContainerElement.nativeElement;
    videoContainerDOM.style.display='block';
  }

  public hideVideoContainer()
  {
    const videoContainerDOM = this.videoContainerElement.nativeElement;
    videoContainerDOM.style.display='none';
  }


  public createClipsFromVideo(){

    const clipsLength = this.maxDurationValue / 5;
    let i, acumStart = 0;
    for(i=0; i < 5; i++ ){


      const newFrm = this.getEmptyFrmObject();
      newFrm.name = 'Clip ' + (i+1);
      newFrm.start = acumStart;
      newFrm.end = newFrm.start + clipsLength;
      acumStart = newFrm.start + clipsLength;


      this.addClip(newFrm);

    }

  }

  public updateClip( evt ){
    const idx = this.frmClip.getCurrentEditClip();

    const frm = evt;
    const clipToEdit = this.listVideos[idx]

    clipToEdit.name = frm.name;
    clipToEdit.start = frm.start;
    clipToEdit.end = frm.end;

    const clipUrl = this.listVideos[0].url + "#t="+ frm.start + "," + frm.end;
    clipToEdit.url = clipUrl;
    this.hideNewClipUI();

  }




}
