//interstitial
  var preloadedInterstitial = null;
  var interstitialReady = false;
  var idInterstitial= '1248338752323018_1248350082321885';
  var idInterstitialLotDay= '1248338752323018_1248350082321885';

  function loadFullscreen(){
    interstitialReady = false;
    FBInstant.getInterstitialAdAsync(idInterstitial, 
    ).then(function(interstitial) {
      // Load the Ad asynchronously
      preloadedInterstitial = interstitial;
      return preloadedInterstitial.loadAsync();
    }).then(function() {
      interstitialReady = true;
      console.log('Interstitial preloaded')
    }).catch(function(err){
      preloadedInterstitial = null;
      console.error('Interstitial failed to preload: ' + err.message);
      console.error('Try to load fullscreen LotDay');
      loadFullscreenLotDay();
    });
  }

  function loadFullscreenLotDay(){
  	FBInstant.getInterstitialAdAsync(idInterstitialLotDay, 
    ).then(function(interstitial) {
      preloadedInterstitial = interstitial;
      return preloadedInterstitial.loadAsync();
    }).then(function() {
      interstitialReady = true;
      console.log('InterstitialLotDay preloaded')
    }).catch(function(err){
      preloadedInterstitial = null;
      console.error('Interstitial failed to preload: ' + err.message);
    });
  }


  function isFullscreenReady(){
    return interstitialReady;
  }
  function showFullscreen(onshow, ondone){
    if(interstitialReady == true){
      onshow(true);
      preloadedInterstitial.showAsync()
      .then(function() {
        // Perform post-ad success operation
        console.log('Interstitial ad finished successfully');  
        preloadedInterstitial = null;     
        loadFullscreen();
        ondone(true);
      })
      .catch(function(e) {
        console.error(e.message);
        ondone(false);
      });
    }
    else if(preloadedInterstitial==null) 
      loadFullscreen();
  }
//video
  var preloadedRewardedVideo = null;
  var videorewardReady = false;
  var idVideoreward= '1248338752323018_1248350215655205';
  var idVideorewardLotDay= '1248338752323018_1248350215655205';

  function loadVideoReward(){
    videorewardReady = false;
    FBInstant.getRewardedVideoAsync(idVideoreward, // Your Ad Placement Id
    ).then(function(rewarded) {
      // Load the Ad asynchronously
      preloadedRewardedVideo = rewarded;
      return preloadedRewardedVideo.loadAsync();
    }).then(function() {
      console.log('Rewarded video preloaded');
      videorewardReady = true;
    }).catch(function(err){
      console.error('Rewarded video failed to preload: ' + err.message);
      console.error('Try to load video LotDay');
      loadVideoRewardLotday();
    });
  }

  function loadVideoRewardLotday(){
    videorewardReady = false;
    FBInstant.getRewardedVideoAsync(idVideorewardLotDay, // Your Ad Placement Id
    ).then(function(rewarded) {
      // Load the Ad asynchronously
      preloadedRewardedVideo = rewarded;
      return preloadedRewardedVideo.loadAsync();
    }).then(function() {
      console.log('Rewarded video LotDay preloaded');
      videorewardReady = true;
    }).catch(function(err){
      console.error('Rewarded video failed to preload: ' + err.message);
      videorewardReady = false;
    });
  }

  function isVideoRewardReady(){
    return videorewardReady;
  }
  function showVideoReward(callback){
    preloadedRewardedVideo.showAsync()
    .then(function() {
      // Perform post-ad success operation
      console.log('Rewarded video watched successfully');
      callback(true);
      loadVideoReward();        
    })
    .catch(function(e) {
      console.error(e.message);
      callback(false);
      loadVideoReward();
    });
    
  }