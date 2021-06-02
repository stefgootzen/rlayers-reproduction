import React, { useCallback, useRef } from 'react';
import { useState, useEffect } from 'react';
import { fromLonLat, toLonLat } from 'ol/proj';
import 'ol/ol.css';
import { RMap, RLayerTile, RLayerVector, RFeature, ROverlay, RLayerCluster } from 'rlayers';
import './overviewMap.css'
import Point from 'ol/geom/Point';
import { Feature } from 'ol';
import { RStyle, RCircle, RFill, RStroke, RText } from 'rlayers/style';


interface MapFeature {
	id: number | string,
	longitude: number,
	latitude: number,
	featureView: React.FunctionComponent<{ highlighted: boolean, onClick: () => void }>,
	detailViews: React.FunctionComponent<any>[],
	priority: number
}

/**
 *
 *
 * @returns
 */
export const OverviewMapView = () => {
	const [view, setView] = useState({ center: fromLonLat([9.5, 51.3]), zoom: 7 });

	const [mapFeatures, setMapFeatures] = useState<MapFeature[]>([])
	const featureLayer = useRef<RLayerVector>()


	return <>
		<RMap
			initial={view}
			view={[view, setView]}
			noDefaultControls={true}
		>
			<RLayerTile
				zIndex={5}
				properties={{ label: "OpenStreetMap" }}
				url="https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/*<RLayerCluster
				ref={featureLayer}
				distance={4}
				features={mapFeatures.map(mapFeature => new Feature(mapFeature))}
				zIndex={13}
			>
				<RStyle
					cacheSize={1024}
					cacheId={useCallback((feature, resolution) => {
						console.log("Cache", feature, resolution)
						return Math.random() + ""
					},
						[]
					)}
					render={useCallback((feature, resolution) => {
						console.log("Render", feature, resolution)
						return (
							<RFeature>
								<ROverlay>
									<div>Hi</div>
								</ROverlay>
							</RFeature>
						);
					}, [])}
				/>
				{/*
					mapFeatures.map(dp => <RFeature key={dp.id} geometry={new Point(fromLonLat([dp.longitude, dp.latitude]))}>
						<ROverlay>
							<dp.featureView
								highlighted={!detailHidden && !!selectedDetailPage && selectedDetailPage.id === dp.id}
								onClick={() => {
									console.log(dp.id)
									setDetailPages(null)
									window.setTimeout(() => {
										setDetailPages(dp.detailViews.map(view => { return { id: dp.id, view: view } }))
										setDetailHidden(false)
									}, 1)
								}} />
						</ROverlay>
					</RFeature>)
					*
				}
			</RLayerCluster>*/}
			<RLayerVector
				ref={featureLayer}
				onChange={e => console.log(e)}
				features={mapFeatures.map(f => new Feature(new Point(fromLonLat([f.longitude, f.latitude]))))}
				zIndex={10}
			>
				<RStyle
					render={(feature) => {
						return <div>Hi</div>
					}}
				>

				</RStyle>
				{/*
					mapFeatures.map(dp => <RFeature key={dp.id} geometry={new Point(fromLonLat([dp.longitude, dp.latitude]))}>
						<ROverlay>
							<dp.featureView
								highlighted={!detailHidden && !!selectedDetailPage && selectedDetailPage.id === dp.id}
								onClick={() => {
									console.log(dp.id)
									setDetailPages(null)
									window.setTimeout(() => {
										setDetailPages(dp.detailViews.map(view => { return { id: dp.id, view: view } }))
										setDetailHidden(false)
									}, 1)
								}} />
						</ROverlay>
					</RFeature>)*/
				}
			</RLayerVector>
		</RMap>
	</>
}
