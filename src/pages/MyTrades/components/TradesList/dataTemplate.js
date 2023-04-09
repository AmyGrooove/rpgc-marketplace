import {AVATAR, BOOTS, BOX, JACKET, RIFLE} from "../../../../theme/sources";
import {orderStatusTypes, orderTypes} from "./tempList";

export const tradesData = [
  {
    type: orderTypes.exchange,
    status: orderStatusTypes.pending,
    date: '2022-10-13T09:46:43.535Z',
    offerInitiator: '123',
    orderMember: {
      id: '43',
      name: 'Testovskii 1',
      icon: AVATAR,
    },
    memberOffer: {
      // price: 2.1232
      items: [
        {
          icon: RIFLE,
          name: 'Rifle piu-piu',
        },
      ],
    },
    myOffer: {
      // price: 2.1232
      items: [
        {
          icon: BOX,
          name: 'Box Of Shadow',
        },
      ],
    },
  },
  {
    type: orderTypes.sale,
    status: orderStatusTypes.rejected,
    date: '2022-10-13T09:46:43.535Z',
    offerInitiator: '321',
    orderMember: {
      id: '43',
      name: 'Testovskii 10',
      icon: AVATAR,
    },
    memberOffer: {
      price: '2.1232',
      // items: [],
    },
    myOffer: {
      // price: 2.1232
      items: [
        {
          icon: JACKET,
          name: 'Dusty Jacket',
        },
      ],
    },
  },
  {
    type: orderTypes.exchange,
    status: orderStatusTypes.pending,
    date: '2022-10-13T09:46:43.535Z',
    offerInitiator: '2',
    orderMember: {
      id: '12',
      name: 'Testovskii 2',
      icon: AVATAR,
    },
    memberOffer: {
      // price: 2.1232
      items: [
        {
          icon: BOOTS,
          name: 'Black Bots',
        },
        {
          icon: BOOTS,
          name: 'Black Bots',
        },
      ],
    },
    myOffer: {
      // price: 2.1232
      items: [
        {
          icon: RIFLE,
          name: 'Rifle piu-piu',
        },
      ],
    },
  },
  {
    type: orderTypes.buy,
    status: orderStatusTypes.completed,
    date: '2022-10-13T09:46:43.535Z',
    offerInitiator: '123',
    orderMember: {
      id: '43',
      name: 'Testovskii 10',
      icon: AVATAR,
    },
    memberOffer: {
      items: [
        {
          icon: BOOTS,
          name: 'Black Boots',
        },
      ],
      // price: 2.1232,
    },
    myOffer: {
      price: '2.1232',
      // items: [],
    },
  },
  {
    type: orderTypes.exchange,
    status: orderStatusTypes.completed,
    date: '2022-10-13T09:46:43.535Z',
    offerInitiator: '123',
    orderMember: {
      id: '432',
      name: 'Testovskii 3',
      icon: AVATAR,
    },
    memberOffer: {
      // price: 2.1232
      items: [
        {
          icon: BOX,
          name: 'Box Of Shadow',
        },
        {
          icon: BOX,
          name: 'Box Of Shadow',
        },
        {
          icon: BOX,
          name: 'Box Of Shadow',
        },
      ],
    },
    myOffer: {
      // price: 2.1232
      items: [
        {
          icon: JACKET,
          name: 'Dusty Jacket',
        },
      ],
    },
  },
  {
    type: orderTypes.exchange,
    status: orderStatusTypes.rejected,
    date: '2022-10-13T09:46:43.535Z',
    offerInitiator: '123',
    orderMember: {
      id: '321',
      name: 'Testovskii 4',
      icon: AVATAR,
    },
    memberOffer: {
      // price: 2.1232
      items: [
        {
          icon: BOX,
          name: 'Box Of Shadow',
        },
      ],
    },
    myOffer: {
      // price: 2.1232
      items: [
        {
          icon: RIFLE,
          name: 'Rifle piu-piu',
        },
        {
          icon: RIFLE,
          name: 'Rifle piu-piu',
        },
        {
          icon: JACKET,
          name: 'Dusty Jacket',
        },
        {
          icon: BOOTS,
          name: 'Black Boots',
        },
      ],
    },
  },
  {
    type: orderTypes.exchange,
    status: orderStatusTypes.pending,
    date: '2022-10-13T09:46:43.535Z',
    offerInitiator: '2',
    orderMember: {
      id: '',
      name: 'Testovskii 5',
      icon: AVATAR,
    },
    memberOffer: {
      // price: 2.1232
      items: [
        {
          icon: BOOTS,
          name: 'Black Boots',
        },
        {
          icon: BOOTS,
          name: 'Black Boots',
        },
        {
          icon: RIFLE,
          name: 'Rifle piu-piu',
        },
        {
          icon: JACKET,
          name: 'Dusty Jacket',
        },
        {
          icon: JACKET,
          name: 'Dusty Jacket',
        },
        {
          icon: BOOTS,
          name: 'Black Boots',
        },
        {
          icon: BOOTS,
          name: 'Black Boots',
        },
        {
          icon: RIFLE,
          name: 'Rifle piu-piu',
        },
        {
          icon: JACKET,
          name: 'Dusty Jacket',
        },
        {
          icon: JACKET,
          name: 'Dusty Jacket',
        },
      ],
    },
    myOffer: {
      // price: 2.1232
      items: [
        {
          icon: BOX,
          name: 'Box Of Shadow',
        },
      ],
    },
  },
]

export const offersList = [
  {
    type: orderTypes.sale,
    date: '2022-10-13T09:46:43.535Z',
    offer: {
      price: 2.5401,
      item: {
        icon: BOX,
        name: 'Graffiti Tools Storage',
      },
    },
  },
  {
    type: orderTypes.buy,
    date: '2022-10-13T09:46:43.535Z',
    offer: {
      price: 2.5372,
      item: {
        icon: JACKET,
        name: 'Bombing Jacket',
      },
    },
  },
  {
    type: orderTypes.salePlus,
    date: '2022-10-13T09:46:43.535Z',
    offer: {
      price: 2.5401,
      item: {
        icon: BOOTS,
        name: 'Black Boots',
      },
    },
  },
]
