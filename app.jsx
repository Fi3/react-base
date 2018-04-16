/* @flow */
import Diff from 'deep-diff';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { append
       , filter
       , map
       , sortBy
       , compose
       , toLower
       , prop
       , contains
       , keys
       , mapObjIndexed
       , merge
       , values
       , assoc
       , reduce
       , replace
       , join
       , times
       , curry
       , length
       , indexOf
       , match
       , split
       , prepend
       } from 'ramda';

// UTILS --section

// workaraound to use object assign with exact types, issue on github: https://github.com/facebook/flow/issues/2405
// TODO change **AS SOON AS** the above ticket is close
const assign = (a: Model, b: B): Object => Object.assign({}, a, b);
type B =
  {| title?: string,
  |}

// we need the below because js is not typed and is the only way to have a compile time check of the types when we use store.dispatch
// we nee to pass the args in an array for the same reason
// <Arg>(actionCreator: (...Array<any>) => Action, ...args: Array<Arg> => {
//   store.dispatch(actionCreator(...args));}
// The above version could works and there is no need to pass the args in an array but flow doesn't fail if the args are wrong!
const dispatch = <Args>(actionCreator: (Args) => Action, args: Args) => {
  const oldState = store.getState();
  store.dispatch(actionCreator(args));
  const newState = store.getState();
  if (Diff.diff(newState, oldState) !== undefined) {
    //$FlowFixMe
    ReactDom.render(<App store={getState(store)}/>, mountNode);
    console.log(store.getState());  // eslint-disable-line no-console
  }
};

// UPDATE --section

type ActionUpdateTitle =
  {| +type: 'ActionUpdateTitle',
     +title: string,
  |};


type Action =
  | ActionUpdateTitle


const udpateTitle = (args: [string]): ActionUpdateTitle => { // eslint-disable-line no-unused-vars
  const title = args[0];
  return {
    type: 'ActionUpdateTitle',
    title,
  };
};


const reducer = (state: Model, action: Action): Model => {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
  case 'ActionUpdateTitle': {
    return assign(state, {members: append(action.title, state.title)});}

  // trick to have flow errors when we do not handle all the action types
  default:
    (action: empty);
    return state;
  }
};


// VIEWS --section

// BOOTSTRAP THE APP --section

type Model =
  {| +title: string,
  |}

const initialState: Model =
  { title: 'ciao',
  };


const mountNode = document.getElementById('main');
const store = createStore(reducer, initialState);
const getState = (store): Model => store.getState();
