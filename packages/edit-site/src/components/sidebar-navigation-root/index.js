/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { globe, layout, symbolFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import SidebarNavigationTitle from '../sidebar-navigation-title';
import { useLink } from '../routes/link';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { useLocation } from '../routes';

export default function SidebarNavigationRoot() {
	const { params } = useLocation();
	const menu = {
		titleSection: {
			parentTitle: __( 'Dashboard' ),
			parentHref: 'index.php',
			title: __( 'Design' ),
		},
		items: [
			{
				...useLink( {
					postType: undefined,
					postId: undefined,
				} ),
				icon: globe,
				'aria-pressed':
					( ! params.postType && ! params.postId ) ||
					( !! params.postType && !! params.postId ),
				children: __( 'Browse' ),
			},
			{
				...useLink( {
					postType: 'wp_template',
					postId: undefined,
				} ),
				icon: layout,
				'aria-pressed':
					params.postType === 'wp_template' && ! params.postId,
				children: __( 'Templates' ),
			},
			{
				...useLink( {
					postType: 'wp_template_part',
					postId: undefined,
				} ),
				icon: symbolFilled,
				'aria-pressed':
					params.postType === 'wp_template_part' && ! params.postId,
				children: __( 'Template Parts' ),
			},
		],
	};

	return (
		<VStack spacing={ 6 }>
			<div className="edit-site-sidebar-navigation-root__header">
				<SidebarNavigationTitle { ...menu.titleSection } />
			</div>
			<ItemGroup>
				{ menu.items.map( ( item, index ) => (
					<SidebarNavigationItem { ...item } key={ index } />
				) ) }
			</ItemGroup>
		</VStack>
	);
}
