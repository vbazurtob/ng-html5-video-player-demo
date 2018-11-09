import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'html5videoplayer';

  // public frmClipName ="";
  // public frmClipStart= 0;
  // public frmClipEnd = 0;
  public maxDurationValue = 0;

  @ViewChild("videoPlayer") videoPlayer;
  @ViewChild("currentEditClip") currentClipEdit;
  @ViewChild("clipFormContainer") clipFormContainer;
  @ViewChild("frmClip") frmClip;
  @ViewChild("errorClipNameTxt") errorClipNameTxt;
  @ViewChild("errorClipStart") errorClipStart;
  @ViewChild("errorClipEnd") errorClipEnd;
  @ViewChild("videoContainerElement") videoContainerElement;






  public listVideos = [{
    "name": "Blender Demo - Full Video",
    "url": "https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4",
    "full": true,
    "start": 0,
    "end": 0
  }];

  ngOnInit(){
    if(this.videoPlayer) {
      const  video = this.videoPlayer.nativeElement;

      // Wait until video metadata is loaded
      video.addEventListener("loadedmetadata", () => {
        this.maxDurationValue = video.duration;

        this.frmClip.updateValidatorsWithMaxDuration(this.maxDurationValue);

        this.showVideoContainer();
        console.log('CREATE CLIPS');
        this.createClipsFromVideo();

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
    console.log(selectedClip);

    // const aElem = selectedClip.querySelector("a");
    console.log(idx);

    video.innerHTML = '';


    this.addVideoSrc(this.videoPlayer.nativeElement, this.listVideos[idx].url, 'video/mp4');
    video.load();
    video.play();
  }

  public addClip( evt ){
    const frm = evt;

    // if ( this.frmClip.isFormValid() === false ) {
    //   return false;
    // }

    const clipUrl = this.listVideos[0].url + "#t="+ frm.start + "," + frm.end;
    frm.url = clipUrl;

    this.listVideos.push( frm );
    this.hideNewClipUI();
  }

  public editClip(evt, idx){
    const selectedClip = this.listVideos[idx];

    // this.frmClipName = selectedClip.name
    // this.frmClipStart = selectedClip.start;
    // this.frmClipEnd = selectedClip.end;

    const currentEdit = document.getElementById("currentEditClip");
    this.currentClipEdit.nativeElement.value = idx;

  }

  public isClipFullVideo(idx){
    return this.listVideos[idx].full === true;
  }

  public showAddNewClipUI(){
    const frmClipContainer = this.clipFormContainer.nativeElement;
    frmClipContainer.style.transform= 'scale(1,1)';
    const emptyFrm = this.getEmptyFrmObject();
    // emptyFrm.end = this.maxDurationValue;

    console.log(emptyFrm);

    this.frmClip.setFrmValues( emptyFrm );

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
    videoContainerDOM.style.visibility='visible';
  }

  public hideVideoContainer()
  {
    const videoContainerDOM = this.videoContainerElement.nativeElement;
    videoContainerDOM.style.visibility='hidden';
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

      console.log(newFrm);

      this.addClip(newFrm);

    }

  }


}
