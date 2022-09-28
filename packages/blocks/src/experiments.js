/**
 * WordPress dependencies
 */
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/experiments';
import { __experimentalAccessKey as dataExperiments } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store } from './store';
import { __experimentalHasContentRoleAttribute } from './store/selectors';

export const { register, unlock } =
	__dangerousOptInToUnstableAPIsOnlyForCoreModules(
		'I know using unstable features means my plugin or theme will inevitably break on the next WordPress release.',
		'@wordpress/blocks'
	);

const { __experimentalPrivateSelector } = unlock( dataExperiments );

export const __experimentalAccessKey = register( {
	// Follow-up on https://github.com/WordPress/gutenberg/pull/42934
	__experimentalHasContentRoleAttribute: ( ...args ) =>
		__experimentalPrivateSelector( store, () =>
			__experimentalHasContentRoleAttribute( ...args )
		),
} );
