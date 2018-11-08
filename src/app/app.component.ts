import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'html5videoplayer';

  public frmClipName ="";
  public frmClipStart= 0;
  public frmClipEnd = 0;
  public maxDurationValue = 0;

  @ViewChild("videoPlayer") videoPlayer;
  @ViewChild("currentEditClip") currentClipEdit;
  @ViewChild("clipFormContainer") clipFormContainer;
  @ViewChild("frmClip") frmClip;
  @ViewChild("errorClipNameTxt") errorClipNameTxt;
  @ViewChild("errorClipStart") errorClipStart;
  @ViewChild("errorClipEnd") errorClipEnd;
  

  
  

  public listVideos = [{
    "name": "Blender Demo - Full Video",
    "url": "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    "full": true,
    "start": 0,
    "end": 0
  }];

  ngOnInit(){
    const  video = this.videoPlayer.nativeElement;

    video.addEventListener("loadedmetadata", () => {
      // console.log('m duration ' + this.maxDurationValue);
      this.maxDurationValue = video.duration;
    });


    // console.log(this.videoPlayer.nativeElement.duration);

    this.addVideoSrc(this.videoPlayer.nativeElement, this.listVideos[0].url, 'video/mp4');

  }

  public addVideoSrc(video, urlSource, mediatype){
      let source = document.createElement('source');
  
      source.src = urlSource;
      source.type = mediatype;
  
      video.appendChild(source);
  }

  public selectClip(evt, idx){
    const selectedClip = evt.target;
    const video = this.videoPlayer.nativeElement;
    console.log(selectedClip);

    // const aElem = selectedClip.querySelector("a");
    console.log(idx);

    video.innerHTML = '';


    this.addVideoSrc(this.videoPlayer.nativeElement, this.listVideos[idx].url, 'video/mp4');
    video.load();
    video.play();
  }

  public addClip(evt){
    const btnAdd = evt.target;
    // const frmClip = document.getElementById('frmClip');

    // checkValidity()
    console.log('frm parent ' + evt.target);
    console.log( this.frmClip );
    
    if ( this.frmClip.nativeElement.checkValidity() === false ) {
      return false;
    }

    const clipUrl = this.listVideos[0].url + "#t="+ this.frmClipStart + "," + this.frmClipEnd; 
    
    this.listVideos.push(
      {
        "name": this.frmClipName,
        "start": this.frmClipStart,
        "end": this.frmClipEnd,
        "full": false,
        "url": clipUrl
      }
    );
    this.hideNewClipUI();
  }

  public editClip(evt, idx){
    const selectedClip = this.listVideos[idx];

    this.frmClipName = selectedClip.name
    this.frmClipStart = selectedClip.start;
    this.frmClipEnd = selectedClip.end;

    const currentEdit = document.getElementById("currentEditClip");
    this.currentClipEdit.nativeElement.value = idx;

  }
  
  public isClipFullVideo(idx){
    return this.listVideos[idx].full === true;
  }

  public showAddNewClipUI(){
    const frmClip = this.clipFormContainer.nativeElement;
    frmClip.style.transform= 'scale(1,1)';

    this.frmClipName = ''
    this.frmClipStart = 0;
    this.frmClipEnd = 0;

  }

  public hideNewClipUI(){
    const frmClip = this.clipFormContainer.nativeElement;
    frmClip.style.transform= 'scale(1,0)';
  }

  public cancelEditClip($evt){
    this.hideNewClipUI();
  }


  public isMetadataAvailable(){

    console.log('UI check ' + this.videoPlayer.nativeElement.duration);

    return !isNaN(this.videoPlayer.nativeElement.duration); 
  }

}
