import { LocationType } from '../types';

export const isEqual = (loc1: LocationType, loc2: LocationType) => {
    return loc1[0] === loc2[0] && loc1[1] === loc2[1];
};
/**
 * Check if two address is within certain Meters.
 * @param origin
 * @param target
 * @param distance - unit Meter
 */
export const isWithin = (origin: LocationType, target: LocationType, distance: number) => {
    const _dis = calcDistance(origin, target);
    return _dis <= distance;
};

/**
 * Covert M to Miles
 * @param m
 */
export const meterToMiles = (m: number) => {
    const num = m * 0.000621371;
    return Math.round((num + Number.EPSILON) * 100) / 100 + ' miles';
};

/**
 * Calc distance between two location. in Meters.
 * @param origin
 * @param target
 */
export const calcDistance = (origin: LocationType, target: LocationType) => {
    const [lon1, lat1] = origin;
    const [lon2, lat2] = target;
    const _dis = calcCrow(lat1, lon1, lat2, lon2);
    return _dis;
};

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in m)
function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000; // meter
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value: number) {
    return (Value * Math.PI) / 180;
}

export const LocationUtils = {
    isEqual,
    isWithin,
    meterToMiles,
    calcDistance,
};
