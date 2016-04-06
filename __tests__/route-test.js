jest.unmock('../client/js/lib/route');
jest.unmock('moment');

import moment from 'moment';
import Route from '../client/js/lib/route';

describe('isPublicTransport', () => {
  it('knows that "subway" is a type of public transport', () => {
    expect(Route.isPublicTransport('subway')).toEqual(true);
  });
  it('knows that "cycling" is not a type of public transport', () => {
    expect(Route.isPublicTransport('cycling')).toEqual(false);
  });
});

describe('firstStop & lastStop', () => {
  const segments = [
    {
      stops: [
        {datetime: '2015-04-17T13:30:00+02:00'},
        {datetime: '2015-04-17T13:31:00+02:00'},
      ],
    },
    {
      stops: [
        {datetime: '2015-04-17T13:32:00+02:00'},
        {datetime: '2015-04-17T13:33:00+02:00'},
      ],
    }
  ];

  it('finds the first stop and returns a moment.js object', () => {
      const first_stop = moment('2015-04-17T13:30:00+02:00').format('X');
      expect(Route.firstStop(segments).format('X')).toEqual(first_stop);
  });
  it('finds the last stop and returns a moment.js object', () => {
      const last_stop = moment('2015-04-17T13:33:00+02:00').format('X');
      expect(Route.lastStop(segments).format('X')).toEqual(last_stop);
  });
});

describe('firstPubTransStop', () => {
  it('finds the first stop in the subway segment', () => {
    const segments = [
      {
        travel_mode: 'walking',
        stops: [
          {datetime: '2015-04-17T13:30:00+02:00'}
        ],
      },
      {
        travel_mode: 'subway',
        stops: [
          {datetime: '2015-04-17T13:32:00+02:00'}
        ],
      }
    ];
    const first_stop = moment('2015-04-17T13:32:00+02:00').format('X');
    expect(Route.firstPubTransStop(segments).format('X')).toEqual(first_stop);
  });
});

describe('countRouteTypes', () => {
  it('counts all route types', () => {
    const routes = [
      {type: 'a'},
      {type: 'b'},
      {type: 'c'},
      {type: 'a'},
    ];
    const frequencies = {'a': 2, 'b': 1, 'c': 1};
    expect(Route.countRouteTypes(routes)).toEqual(frequencies);
  });
  it('does not choke on an empty array', () => {
    expect(Route.countRouteTypes([])).toEqual({});
  });
});

describe('initializeFilters', () => {
  it('finds all distinct route types and maps them to true', () => {
    const routes = [
      {type: 'a'},
      {type: 'b'},
      {type: 'a'},
    ];
    const filters = new Map([
      ['a', true],
      ['b', true]
    ]);
    expect(Route.initializeFilters(routes)).toEqual(filters);
  });
  it('does not choke on an empty array', () => {
    expect(Route.initializeFilters([])).toEqual(new Map());
  });
});

describe('filterRoutes', () => {
  it('correctly marks enabled routes with a "visible" property.', () => {
    const filters = new Map([
      ['a', true],
      ['b', false]
    ]);
    const routes = [
      {type: 'a'},
      {type: 'b'},
      {type: 'a'},
    ];
    const filtered_routes = Route.filterRoutes(routes, filters);
    expect(filtered_routes[0].visible).toBeDefined();
    expect(filtered_routes[0].visible).toBe(true);
    expect(filtered_routes[1].visible).toBe(false);
  });
});
