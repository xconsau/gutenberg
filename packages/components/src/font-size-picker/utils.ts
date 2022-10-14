/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import type { FontSizePickerProps, FontSize } from './types';

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

/**
 * If all of the given font sizes have the same unit (e.g. 'px'), return that
 * unit. Otherwise return null.
 *
 * @param  fontSizes List of font sizes.
 * @return The common unit, or null.
 */
export function getCommonSizeUnit( fontSizes: FontSize[] ) {
	const [ firstFontSize, ...otherFontSizes ] = fontSizes;
	if ( ! firstFontSize ) {
		return null;
	}
	const [ , firstUnit ] = parseNumberAndUnitFromSize( firstFontSize.size );
	const areAllSizesSameUnit = otherFontSizes.every( ( fontSize ) => {
		const [ , unit ] = parseNumberAndUnitFromSize( fontSize.size );
		return unit === firstUnit;
	} );
	return areAllSizesSameUnit ? firstUnit : null;
}
