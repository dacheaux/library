import React from 'react';
import { Iterable } from 'immutable';

// Higher Order component to wrap the props
const ToJS = WrappedComponent => (wrappedComponentProps) => {
	const KEY = 0;
	const VALUE = 1;
	const propsJS = Object.entries(wrappedComponentProps).reduce(
		(newProps, wrappedComponentProp) => {
			newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(
				wrappedComponentProp[VALUE]
			)
				? wrappedComponentProp[VALUE].toJS()
				: wrappedComponentProp[VALUE];
			return newProps;
		},
		{}
	);
	return <WrappedComponent {...propsJS} />;
};

export default ToJS;
