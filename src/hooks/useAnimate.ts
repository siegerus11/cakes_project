import { useState, useCallback } from 'react';

type AnimationDirection = 'in' | 'out';

type UseAnimateOptions = {
	onOpen?: () => void;
	onClose?: () => void;
	onAnimationEnd?: () => void;
	direction?: AnimationDirection;
};

type UseAnimateReturn = {
	isAnimating: boolean;
	isVisible: boolean;
	animationDirection: AnimationDirection;
	animateIn: () => void;
	animateOut: () => void;
	handleAnimationStart: () => void;
	handleAnimationEnd: () => void;
	getAnimationClass: (baseClass: string, activeClass: string) => string;
};

const useAnimate = (options: UseAnimateOptions = {}): UseAnimateReturn => {
	const {
		onOpen,
		onClose,
		onAnimationEnd,
		direction: initialDirection = 'in'
	} = options;

	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [animationDirection, setAnimationDirection] =
		useState<AnimationDirection>(initialDirection);

	const animateIn = useCallback(() => {
		setIsVisible(true);
		setAnimationDirection('in');
		onOpen?.();
	}, [onOpen]);

	const animateOut = useCallback(() => {
		setIsAnimating(true); // isAnimating становиться true -> добаляются классы ан-ции -> ан-ции проигрываются -> срабатывает handleAnimationEnd -> isVisible становится false.
		setAnimationDirection('out');
		onClose?.();
	}, [onClose]);

	const handleAnimationStart = useCallback(() => {
		setIsAnimating(true);
	}, []);

	const handleAnimationEnd = useCallback(() => {
		if (animationDirection === 'out') {
			setIsVisible(false);
		}
		onAnimationEnd?.();
		setIsAnimating(false);
	}, [animationDirection, onAnimationEnd]);

	const getAnimationClass = useCallback(
		(baseClass: string, activeClass: string) => {
			if (!isAnimating) return baseClass;
			return `${baseClass} ${activeClass}`;
		},
		[isAnimating]
	);

	return {
		isAnimating,
		isVisible,
		animationDirection,
		animateIn,
		animateOut,
		handleAnimationStart,
		handleAnimationEnd,
		getAnimationClass
	};
};

export default useAnimate;
