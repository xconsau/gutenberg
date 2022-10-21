/**
 * WordPress dependencies
 */
import { __experimentalListView as ListView } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import {
	useFocusOnMount,
	useFocusReturn,
	useInstanceId,
	useMergeRefs,
} from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { focus } from '@wordpress/dom';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { closeSmall } from '@wordpress/icons';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { ESCAPE } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import { store as editPostStore } from '../../store';

export default function ListViewSidebar() {
	const { setIsListViewOpened } = useDispatch( editPostStore );

	const focusOnMountRef = useFocusOnMount( 'firstElement' );
	const headerFocusReturnRef = useFocusReturn();
	const contentFocusReturnRef = useFocusReturn();

	function closeOnEscape( event ) {
		if ( event.keyCode === ESCAPE && ! event.defaultPrevented ) {
			event.preventDefault();
			setIsListViewOpened( false );
		}
	}

	const instanceId = useInstanceId( ListViewSidebar );
	const labelId = `edit-post-editor__list-view-panel-label-${ instanceId }`;

	// This ref helps us focus the list view.
	const listViewRef = useRef();
	// This only fires when the list view is open because of the conditional rendering. It is the same shortcut to open but that is defined as a global shortcut and only fires when the list view is closed.
	useShortcut( 'core/edit-post/toggle-list-view', () => {
		// If the list view has focus, we know it is safe to close.
		if (
			listViewRef.current
				.closest( '[role="region"][tabindex="-1"]' )
				.contains( listViewRef.current.ownerDocument.activeElement )
		) {
			setIsListViewOpened( false );
			// If the list view does not have focus, we should move focus to it.
		} else {
			// Find the first tabbable based on the attached ref.
			focus.tabbable.find( listViewRef.current )[ 0 ].focus();
		}
	} );

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			aria-labelledby={ labelId }
			className="edit-post-editor__list-view-panel"
			onKeyDown={ closeOnEscape }
		>
			<div
				className="edit-post-editor__list-view-panel-header"
				ref={ headerFocusReturnRef }
			>
				<strong id={ labelId }>{ __( 'List View' ) }</strong>
				<Button
					icon={ closeSmall }
					label={ __( 'Close List View Sidebar' ) }
					onClick={ () => setIsListViewOpened( false ) }
				/>
			</div>
			<div
				className="edit-post-editor__list-view-panel-content"
				ref={ useMergeRefs( [
					contentFocusReturnRef,
					focusOnMountRef,
					listViewRef,
				] ) }
			>
				<ListView />
			</div>
		</div>
	);
}
