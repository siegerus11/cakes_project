import { useState, useCallback, useRef } from 'react';

type AnimationDirection = 'in' | 'out';

interface UseAnimateOptions {
	onOpen?: () => void;
	onClose?: () => void;
	onAnimationEnd?: () => void;
	direction?: AnimationDirection;
}

interface UseAnimateReturn {
	isAnimating: boolean;
	isVisible: boolean;
	animationDirection: AnimationDirection;
	animateIn: () => void;
	animateOut: () => void;
	handleAnimationStart: () => void;
	handleAnimationEnd: () => void;
	getAnimationClass: (baseClass: string, activeClass: string) => string;
}

const useAnimate = (options: UseAnimateOptions = {}): UseAnimateReturn => {
	const { onOpen, onClose, onAnimationEnd, direction: initialDirection = 'in' } = options;

	const [isAnimating, setIsAnimating] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [animationDirection, setAnimationDirection] = useState<AnimationDirection>(initialDirection);
	const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearAnimationTimeout = useCallback(() => {
		if (animationTimeoutRef.current) {
			clearTimeout(animationTimeoutRef.current);
			animationTimeoutRef.current = null;
		}
	}, []);

	const animateIn = useCallback(() => {
		clearAnimationTimeout();
		setIsAnimating(true);
		setIsVisible(true);
		setAnimationDirection('in');
		onOpen?.();
	}, [clearAnimationTimeout, onOpen]);

	const animateOut = useCallback(() => {
		clearAnimationTimeout();
		setIsAnimating(true);
		setAnimationDirection('out');
		onClose?.();
	}, [clearAnimationTimeout, onClose]);

	const handleAnimationStart = useCallback(() => {
		setIsAnimating(true);
	}, []);

	const handleAnimationEnd = useCallback(() => {
		setIsAnimating(false);
		if (animationDirection === 'out') {
			setIsVisible(false);
		}
		onAnimationEnd?.();
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
