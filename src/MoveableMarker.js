L.Playback = L.Playback || {};

L.Playback.MoveableMarker = L.Marker.extend({    
    initialize: function (startLatLng, options, feature) {    
        var marker_options = options.marker || {};
        this._feature =  feature;
        
        if (jQuery !== undefined){
            marker_options = marker_options(feature);
        }

        L.Marker.prototype.initialize.call(this, startLatLng, marker_options);
        
        this.popupContent = '';
        this.popupContent = feature.voyagedetails.first_ship_name;

        if (marker_options.getPopup){
            this.popupContent = marker_options.getPopup(feature);            
        }
        
        this.bindPopup(this.getPopupContent());
        // this.bindPopup(this.getPopupContent() + startLatLng.toString());
    },
    
    getPopupContent: function() {
        if (this.popupContent !== ''){
            return '<b>' + this.popupContent + '</b><br/>';
        }
        
        return '';
    },

    move: function (latLng, transitionTime) {
        // Only if CSS3 transitions are supported
        if (L.DomUtil.TRANSITION) {
            if (this._icon) { 
                this._icon.style[L.DomUtil.TRANSITION] = 'all ' + transitionTime + 'ms linear'; 
                if (this._popup && this._popup._wrapper)
                    this._popup._wrapper.style[L.DomUtil.TRANSITION] = 'all ' + transitionTime + 'ms linear'; 
            }
            if (this._shadow) { 
                this._shadow.style[L.DomUtil.TRANSITION] = 'all ' + transitionTime + 'ms linear'; 
            }
        }
        this.setLatLng(latLng);
        // if (this._popup) {
        //     this._popup.setContent(this.getPopupContent() + this._latlng.toString());
        // }    
    }
});

