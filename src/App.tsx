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

	return <>
		<h1>Example with ROverlay (crashes)</h1>
		<RMap
			initial={view}
			view={[view, setView]}
			noDefaultControls={true}
			className="map">
			<ROSM />

			<RLayerVector
				onChange={e => console.log(e)}
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
				features.map(feature => <div>
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

		<h1>Example without ROverlay (works)</h1>
		<RMap
			initial={view}
			view={[view, setView]}
			noDefaultControls={true}
			className="map">
			<ROSM />

			<RLayerVector
				onChange={e => console.log(e)}
				zIndex={10}
			>
				{
					features2.map(f => <RFeature key={f.id} geometry={new Point(fromLonLat([f.longitude, f.latitude]))}></RFeature>)
				}
			</RLayerVector>
		</RMap>
		<div>
			{
				features2.map(feature => <div>
					{feature.id}
					<button onClick={() => setFeatures2(features2.filter(f => f !== feature))}>Remove</button>
				</div>)
			}
			<button onClick={
				() => setFeatures2((prev) => [
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
}


export const coords: Record<string, Coordinate> = {
	"Arc de Triomphe": [2.295, 48.8737],
	"Place d'Italie": [2.355, 48.831],
	Bastille: [2.369, 48.853],
	"Tour Eiffel": [2.294, 48.858],
	Montmartre: [2.342, 48.887],
};

let unique_id = 0;

export function App2(): JSX.Element {
	// The features must be part of the state as they will be modified
	const [features, setFeatures] = React.useState(() =>
		Object.keys(coords).map(
			(f) =>
				new Feature({
					geometry: new Point(fromLonLat(coords[f])),
					name: f,
					uid: unique_id++,
				})
		)
	);
	const vectorRef = React.useRef() as React.RefObject<RLayerVector>;
	return (
		<React.Fragment>
			<h1>Example from <a href="https://mmomtchev.github.io/rlayers/#/add_delete">https://mmomtchev.github.io/rlayers/#/add_delete</a> with added ROverlay (crashes)</h1>
			<RMap
				className="map"
				initial={{ center: fromLonLat([2.364, 48.82]), zoom: 11 }}
				onClick={(e) => {

					const coords = e.map.getCoordinateFromPixel(e.pixel);
					features.push(
						new Feature({ geometry: new Point(coords), uid: unique_id++ })
					);
					// Why not setFeatures(features) ?
					// Because it won't have any effect -
					// unless you artificially create a new array
					// React won't know that something changed
					setFeatures([...features]);
				}}
			>
				<ROSM />

				<RLayerVector ref={vectorRef}>
					<RStyle.RStyle>
						<RStyle.RCircle radius={3}>
							<RStyle.RFill color={"red"} />
						</RStyle.RCircle>
					</RStyle.RStyle>
					{features.map((f) => (
						<RFeature
							// This is the very important part: if we are going to be
							// adding or deleting features, we must have a key field
							// that won't be transient - we can't use the array index, as
							// it will change every time we delete a feature in the middle
							key={f.get("uid")}
							feature={f}
							onClick={(e) => {
								// This the deletion
								const idx = features.findIndex(
									(x) => x.get("uid") === e.target.get("uid")
								);
								if (idx >= 0) {
									features.splice(idx, 1);
									setFeatures([...features]);
									// It is very important to return false to stop the
									// event propagation - otherwise that same event will
									// also trigger the Map onClick
									return false;
								}
							}}
						>
							<ROverlay>
								<div>{f.get("uid")}</div>
							</ROverlay>
						</RFeature>
					))}
				</RLayerVector>
			</RMap>
			<div className="mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow">
				<p>
					Click an empty space to add a monument or click a monument to delete
					it.
		</p>
			</div>
		</React.Fragment>
	);
}

