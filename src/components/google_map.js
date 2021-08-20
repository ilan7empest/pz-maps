import React, { useRef, useEffect } from 'react';

import { layers } from '../layers';

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'realative',
};

const GoogleMap = () => {
  const mapRef = useRef(null);
  const { govmap } = window;

  function reset() {
    govmap.setVisibleLayers([], layers);
  }

  function searchLayer(e) {
    const searchValue = e.target.value;
    var params = {
      layerName: searchValue,
      zoomToExtent: true,
    };
    govmap.filterLayers(params);
  }

  useEffect(() => {
    const { id: mapID } = mapRef.current;
    govmap.createMap(mapID, {
      token: '5a4b8472-b95b-4687-8179-0ccb621c7990',
      layers,
      visibleLayers: ['atractions'],
      showXY: true,
      identifyOnClick: true,
      isEmbeddedToggle: false,
      background: '-1',
      layersMode: 1,
      zoomButtons: false,
    });
  });

  return (
    <>
      <div ref={mapRef} id='map' style={mapStyles}></div>
      <div style={{ position: 'absolute', top: 15, left: 200, minWidth: 300 }}>
        <div className='row card p-3'>
          <div className='col-6'></div>
          <div className='col-6'>
            <input
              placeholder='חפש שכבות'
              className='form-control'
              onChange={searchLayer}
            />
            <div className='d-flex align-items-center justify-content-end mt-2'>
              <label className='form-check-label' htmlFor='searchLayers'>
                אפס הכל
              </label>
              <input
                type='checkbox'
                id='searchLayers'
                name='searchLayers'
                className='ms-1'
                onClick={reset}
              />
            </div>
          </div>
        </div>
      </div>
    </>

    // <div style={mapStyles} className='map' id='map'>
    //   <Map
    //     bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
    //     defaultCenter={defaultMapProps.center}
    //     defaultZoom={defaultMapProps.zoom}>
    //     <AnyReactComponent />
    //   </Map>
    //   <button style={{ position: 'absolute', top: 0 }} onClick={showExample}>
    //     Click me
    //   </button>
    // </div>
  );
};

export default GoogleMap;
