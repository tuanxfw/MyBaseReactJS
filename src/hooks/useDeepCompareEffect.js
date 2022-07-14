import { useRef, useEffect, useMemo } from 'react';
import { isEqual } from 'lodash';

const useDeepCompareEffect = (callback, dependencies) => {
	const preDependencies = useRef([]);

	const depsMemo = useMemo(() => {
		if (!isEqual(preDependencies.current, dependencies)) {
			preDependencies.current = dependencies;

			return dependencies;
		} else {
			return preDependencies.current;
		}
	}, [dependencies]);

	useEffect(() => {
		const cleanUpFn = callback();

		return () => {
			if (cleanUpFn && typeof cleanUpFn === 'function') {
				cleanUpFn();
			}
		};
	}, depsMemo);
};

export default useDeepCompareEffect;