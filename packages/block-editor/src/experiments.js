/**
 * WordPress dependencies
 */
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/experiments';
import { __experimentalAccessKey as dataExperiments } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store } from './store';
import {
	__unstableSelectionHasUnmergeableBlock,
	__unstableGetContentLockingParent,
	__unstableGetTemporarilyEditingAsBlocks,
} from './store/selectors';

export const { register, unlock } =
	__dangerousOptInToUnstableAPIsOnlyForCoreModules(
		'I know using unstable features means my plugin or theme will inevitably break on the next WordPress release.',
		'@wordpress/block-editor'
	);

const { __experimentalPrivateSelector } = unlock( dataExperiments );

export const __experimentalAccessKey = register( {
	// Follow-up on https://github.com/WordPress/gutenberg/pull/42934
	__unstableSelectionHasUnmergeableBlock: __experimentalPrivateSelector(
		store,
		__unstableSelectionHasUnmergeableBlock
	),

	// Follow-up on https://github.com/WordPress/gutenberg/pull/43037
	__unstableGetContentLockingParent: __experimentalPrivateSelector(
		store,
		__unstableGetContentLockingParent
	),
	__unstableGetTemporarilyEditingAsBlocks: __experimentalPrivateSelector(
		store,
		__unstableGetTemporarilyEditingAsBlocks
	),
} );
