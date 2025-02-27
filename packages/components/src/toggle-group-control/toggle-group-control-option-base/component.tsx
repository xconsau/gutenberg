/**
 * External dependencies
 */
import type { ForwardedRef } from 'react';
// eslint-disable-next-line no-restricted-imports
import { Radio } from 'reakit';

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import {
	contextConnect,
	useContextSystem,
	WordPressComponentProps,
} from '../../ui/context';
import type {
	ToggleGroupControlOptionBaseProps,
	WithToolTipProps,
} from '../types';
import { useToggleGroupControlContext } from '../context';
import * as styles from './styles';
import { useCx } from '../../utils/hooks';
import Tooltip from '../../tooltip';

const { ButtonContentView, LabelView } = styles;

const WithToolTip = ( { showTooltip, text, children }: WithToolTipProps ) => {
	if ( showTooltip && text ) {
		return (
			<Tooltip text={ text } position="top center">
				{ children }
			</Tooltip>
		);
	}
	return <>{ children }</>;
};

function ToggleGroupControlOptionBase(
	props: WordPressComponentProps<
		ToggleGroupControlOptionBaseProps,
		'button',
		false
	>,
	forwardedRef: ForwardedRef< any >
) {
	const toggleGroupControlContext = useToggleGroupControlContext();
	const id = useInstanceId(
		ToggleGroupControlOptionBase,
		toggleGroupControlContext.baseId || 'toggle-group-control-option-base'
	) as string;
	const buttonProps = useContextSystem(
		{ ...props, id },
		'ToggleGroupControlOptionBase'
	);
	const {
		className,
		isBlock = false,
		isIcon = false,
		value,
		children,
		size = 'default',
		showTooltip = false,
		...radioProps
	} = {
		...toggleGroupControlContext,
		...buttonProps,
	};

	const isActive = radioProps.state === value;
	const cx = useCx();
	const labelViewClasses = cx( isBlock && styles.labelBlock );
	const classes = cx(
		styles.buttonView,
		isIcon && styles.isIcon( { size } ),
		className,
		isActive && styles.buttonActive
	);

	return (
		<LabelView className={ labelViewClasses } data-active={ isActive }>
			<WithToolTip
				showTooltip={ showTooltip }
				text={ radioProps[ 'aria-label' ] }
			>
				<Radio
					{ ...radioProps }
					as="button"
					aria-label={ radioProps[ 'aria-label' ] }
					className={ classes }
					data-value={ value }
					ref={ forwardedRef }
					value={ value }
				>
					<ButtonContentView>{ children }</ButtonContentView>
				</Radio>
			</WithToolTip>
		</LabelView>
	);
}

/**
 * `ToggleGroupControlOptionBase` is a form component and is meant to be used as an internal,
 * generic component for any children of `ToggleGroupControl`.
 *
 * @example
 * ```jsx
 * import {
 *   __experimentalToggleGroupControl as ToggleGroupControl,
 *   __experimentalToggleGroupControlOptionBase as ToggleGroupControlOptionBase,
 * } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <ToggleGroupControl label="my label" value="vertical" isBlock>
 *       <ToggleGroupControlOption value="horizontal" label="Horizontal" />
 *       <ToggleGroupControlOption value="vertical" label="Vertical" />
 *     </ToggleGroupControl>
 *   );
 * }
 * ```
 */
const ConnectedToggleGroupControlOptionBase = contextConnect(
	ToggleGroupControlOptionBase,
	'ToggleGroupControlOptionBase'
);

export default ConnectedToggleGroupControlOptionBase;
