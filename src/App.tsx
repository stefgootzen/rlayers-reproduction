import React from 'react';
import {useState} from 'react';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';
import {RMap, RLayerVector, RFeature, ROverlay, ROSM} from 'rlayers';
import Point from 'ol/geom/Point';
import './App.css';

const features = [0, 1, 2].map(id => ({
  id,
  longitude: 9.5 - 0.5 + Math.random(),
  latitude: 51.3 - 0.5 + Math.random()
}));

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const App = () => {
  const [view, setView] = useState({center: fromLonLat([9.5, 51.3]), zoom: 8});
  const [activeFeatureId, setActiveFeatureId] = useState<number | null>(null);

  return (
    <>
      <h1>Example with ROverlay (crashes)</h1>
      <RMap
        initial={view}
        view={[view, setView]}
        className="map">
        <ROSM/>
        <RLayerVector
          zIndex={10}
        >
          {
            features.map(f => <RFeature key={f.id} geometry={new Point(fromLonLat([f.longitude, f.latitude]))}>
              {/*
							Adding an ROverlay to a feature will cause a crash when the overlay is removed
						*/}
              {
                (f.id === activeFeatureId) && (
                  <ROverlay key={f.id}>
                    <div>{f.id}</div>
                  </ROverlay>
                )
              }
            </RFeature>)
          }
        </RLayerVector>
      </RMap>
        <button onClick={
          () => setActiveFeatureId(getRandomInt(3))
        }>
          Set active Feature ID
        </button>
    </>
  );
}

