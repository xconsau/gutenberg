/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import type { FontSizePickerProps } from './types';

/**
 * Given a font size, returns the numeric part and unit part. For example, given
 * '30px', 30 and 'px' would be returned.
 *
 * @param  size Font size.
 * @return An array with the number and the unit if it exists.
 */
export function parseNumberAndUnitFromSize(
	size: FontSizePickerProps[ 'value' ]
): [ number, string ] | [ number ] | [] {
	const [ , rawNumber, unit ] = `${ size }`.match( /^([\d\.]+)(\D*)/ ) ?? [];
	const number = Number( rawNumber );
	if ( ! isNaN( number ) && isFinite( number ) ) {
		return unit ? [ number, unit ] : [ number ];
	}
	return [];
}

/**
 * Some themes use css vars for their font sizes, so until we
 * have the way of calculating them don't display them.
 *
 * @param  value The value that is checked.
 * @return Whether the value is a simple css value.
 */
export function isSimpleCssValue(
	value: NonNullable< FontSizePickerProps[ 'value' ] >
) {
	const sizeRegex = /^[\d\.]+(px|em|rem|vw|vh|%)?$/i;
	return sizeRegex.test( String( value ) );
}
