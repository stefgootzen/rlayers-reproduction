import React from 'react';
import { useState } from 'react';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { RMap, RLayerVector, RFeature, ROverlay, ROSM, RStyle } from 'rlayers';
import Point from 'ol/geom/Point';
import './App.css';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';

interface CustomFeature {
	id: number,
	longitude: number,
	latitude: number
}

export const App = () => {

	const [view, setView] = useState({ center: fromLonLat([9.5, 51.3]), zoom: 8 });
	const [features, setFeatures] = useState<CustomFeature[]>([]);
	const [features2, setFeatures2] = useState<CustomFeature[]>([]);

	return (
		<>
		<h1>Example with ROverlay (crashes)</h1>
		<RMap
			initial={view}
			view={[view, setView]}
			className="map">
			<ROSM />

			<RLayerVector
				zIndex={10}
			>
				{
					features.map(f => <RFeature key={f.id} geometry={new Point(fromLonLat([f.longitude, f.latitude]))}>
						{/*
							Adding an ROverlay to a feature will cause a crash when a feature is removed
						*/}
						<ROverlay>
							<div>{f.id}</div>
						</ROverlay>
					</RFeature>)
				}
			</RLayerVector>
		</RMap>
		<div>
			{
				features.map(feature => <div key={feature.id}>
					{feature.id}
					<button onClick={() => setFeatures(features.filter(f => f !== feature))}>Remove</button>
				</div>)
			}
			<button onClick={
				() => setFeatures((prev) => [
					...prev,
					{
						id: Math.random(),
						longitude: 9.5 - 0.5 + Math.random(),
						latitude: 51.3 - 0.5 + Math.random()
					}])
			}>
				Add
			</button>
		</div>
	</>
	);
}

