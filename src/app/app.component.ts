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

  @ViewChild("clipFormContainer") clipFormContainer;
  @ViewChild("frmClip") frmClip;
  @ViewChild("errorClipNameTxt") errorClipNameTxt;
  @ViewChild("errorClipStart") errorClipStart;
  @ViewChild("errorClipEnd") errorClipEnd;
  @ViewChild("videoContainerElement") videoContainerElement;





// Array  plauylist
  public listVideos = [];

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
        this.maxDurationValue = video.duration;

        this.frmClip.updateValidatorsWithMaxDuration(this.maxDurationValue);

        this.showVideoContainer();
        console.log('CREATE CLIPS');

        if(this.listVideos.length == 1){
          this.createClipsFromVideo();
        }

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


    ////////////////// TODO VALIDATE start < end //////////////////////////

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
    const frmClipContainer = this.clipFormContainer.nativeElement;
    frmClipContainer.style.transform= 'scale(1,1)';
    this.frmClip.setFrmValues( selectedClip );

    this.frmClip.setCurrentEditClip(idx);
    //UI btns
    this.frmClip.hideAddButton();
    this.frmClip.showEditButton();

  }

  private deleteClip(evt, idx){
    this.listVideos[idx] = null;
    delete this.listVideos[idx];
    this.listVideos = this.listVideos.filter( x => x != null );
    // console.log(this.listVideos);
  }

  public isClipFullVideo(idx){
    return this.listVideos[idx].full === true;
  }

  public showAddNewClipUI(){
    const frmClipContainer = this.clipFormContainer.nativeElement;
    frmClipContainer.style.transform= 'scale(1,1)';
    const emptyFrm = this.getEmptyFrmObject();
    this.frmClip.setFrmValues( emptyFrm );

    this.frmClip.showAddButton();
    this.frmClip.hideEditButton();
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

      // console.log(newFrm);

      this.addClip(newFrm);

    }

  }

  private updateClip( evt ){
    const idx = this.frmClip.getCurrentEditClip();

    const frm = evt;
    const clipToEdit = this.listVideos[idx]

    ////////////////// TODO VALIDATE start < end //////////////////////////

    // if ( this.frmClip.isFormValid() === false ) {
    //   return false;
    // }

    clipToEdit.name = frm.name;
    clipToEdit.start = frm.start;
    clipToEdit.end = frm.end;

    const clipUrl = this.listVideos[0].url + "#t="+ frm.start + "," + frm.end;
    clipToEdit.url = clipUrl;

    // this.listVideos.push( frm );
    this.hideNewClipUI();


  }




}
