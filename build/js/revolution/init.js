var tpj=jQuery;
var revapi24;
tpj(document).ready(function() {

	if(tpj("#rev_slider").revolution == undefined){
		revslider_showDoubleJqueryError("#rev_slider");
	}else{
		revapi24 = tpj("#rev_slider").show().revolution(
			/*{
			sliderType:"standard",
			sliderLayout:"fullscreen",
			dottedOverlay:"none",
			delay:7000,
			autoHeight: 'off',
			minHeight:380,
			navigation: {
				keyboardNavigation:"off",
				keyboard_direction: "horizontal",
				onHoverStop:"off",
				touch:{
					touchenabled:"on",
					swipe_threshold: 75,
					swipe_min_touches: 1,
					swipe_direction: "horizontal",
					drag_block_vertical: false
				},
				bullets: {
					enable: true,
					hide_onmobile: true,

					direction: "horizontal",
					container: 'layergrid',
					h_align: "right",
					v_align: "bottom",
					h_offset: 30,
					v_offset: 110,
					space: 12
				},
				arrows: {
					enable:true,
					tmp:'',
					left: {
						h_align:"left",
						v_align:"center",
						h_offset:40,
						v_offset:0
					},
					right: {
						h_align:"right",
						v_align:"center",
						h_offset:40,
						v_offset:0
					}
				}
			},
			parallax: {
				type:"scroll",
				origo:"slidercenter",
				speed:300,
				levels:[5,10,15,20,25,30,35,40,45,50,47,48,49,50,51,55],
				disable_onmobile: 'on'
			},

			lazyType:"none",
			shadow:0,
			spinner:"off",
			stopLoop:"on",
			stopAfterLoops:0,
			shuffle:"off",
			autoHeight:"on",
			fullScreenAlignForce:"off",
			fullScreenOffsetContainer: ".navbar",
			fullScreenOffset: "",
			disableProgressBar:"on",
			hideThumbsOnMobile:"off",
			hideSliderAtLimit:0,
			hideCaptionAtLimit:0,
			hideAllCaptionAtLilmit:0,
			debugMode:false,
			fallbacks: {
				simplifyAll:"off",
				nextSlideOnWindowFocus:"off",
				disableFocusListener:false,
			}
		}*/
		{
      sliderType:"standard",
      sliderLayout:"fullscreen",
      dottedOverlay:"none",
      delay:7000,
      autoHeight: 'on',
      minHeight:380,
      navigation: {
        keyboardNavigation:"off",
        keyboard_direction: "horizontal",
        onHoverStop:"off",
        touch:{
          touchenabled:"on",
          swipe_threshold: 75,
          swipe_min_touches: 1,
          swipe_direction: "horizontal",
          drag_block_vertical: false
        },
				arrows: {
					enable:true,
					tmp:'',
					hide_onmobile: true,
					left: {
						container: 'layergrid',
						h_align:"left",
						v_align:"bottom",
						h_offset:120,
						v_offset:0
					},
					right: {
						container: 'layergrid',
						h_align:"left",
						v_align:"bottom",
						h_offset:230,
						v_offset:0
					}
				},
				tabs: {
					enable: true,
					style: '',
					h_align: 'right',
        	v_align: 'bottom',
        	h_offset: 0,
        	v_offset: 0,
					width: 360,
					height: 170,
					//min_width: 180,
					tmp: '<button class="slide-tab" type="button"><span class="slide-tab__number">{{param1}}</span><span class="slide-tab__title">{{title}}</span></button>',
				},
      },
      parallax: {
        type:"scroll",
        origo:"slidercenter",
        speed:300,
        levels:[5,10,15,20,25,30,35,40,45,50,47,48,49,50,51,55],
        disable_onmobile: 'on'
      },
      responsiveLevels:[1200,992,768,576],
      gridwidth:[1140,960,740,540],
      gridheight:[800],
      lazyType:"none",
      shadow:0,
      spinner:"off",
      stopLoop:"on",
      stopAfterLoops:0,
      shuffle:"off",
      autoHeight:"on",
      fullScreenAlignForce:"off",
      fullScreenOffsetContainer: ".navbar",
      fullScreenOffset: "",
      disableProgressBar:"on",
      hideThumbsOnMobile:"off",
      hideSliderAtLimit:0,
      hideCaptionAtLimit:0,
      hideAllCaptionAtLilmit:0,
      debugMode:false,
      fallbacks: {
        simplifyAll:"off",
        nextSlideOnWindowFocus:"off",
        disableFocusListener:false,
      }
    });
	}

});
