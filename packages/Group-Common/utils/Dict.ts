import { LocationType } from '../types';

export const cityArray = ['Bay Area', 'Los Angeles', 'New York', 'Seattle', 'Boston'];

export const LOCATIONS = [
    {
        name: 'Bay Area',
        location: [37.374199005952406, -121.98115832169046].reverse() as LocationType,
    },
    {
        name: 'Los Angeles',
        location: [34.053114422453746, -118.25004851862822].reverse() as LocationType,
    },
    {
        name: 'Seattle',
        location: [47.6058021607631, -122.32902917976305].reverse() as LocationType,
    },
    {
        name: 'New York',
        location: [40.7691820179726, -73.97585949251001].reverse() as LocationType,
    },
    {
        name: 'Boston',
        location: [42.36042112879496, -71.05739768260307].reverse() as LocationType,
    },
];
