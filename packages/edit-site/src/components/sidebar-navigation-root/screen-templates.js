/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalVStack as VStack,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorBackButton as NavigatorBackButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { layout } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { useLink } from '../routes/link';
import SidebarNavigationTitle from '../sidebar-navigation-title';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { useLocation } from '../routes';

export default function SidebarNavigationScreenTemplates() {
	const { params } = useLocation();
	const menu = {
		header: {
			parentTitle: __( 'Design' ),
			title: __( 'Templates' ),
		},
		items: [
			{
				...useLink( {
					postType: 'wp_template',
					postId: 'twentytwentythree//index',
				} ),
				icon: layout,
				children: __( 'Index' ),
				'aria-pressed':
					params.postType === 'wp_template' &&
					params.postId === 'twentytwentythree//index',
			},
			{
				...useLink( {
					postType: 'wp_template',
					postId: 'twentytwentythree//home',
				} ),
				icon: layout,
				children: __( 'Home' ),
				'aria-pressed':
					params.postType === 'wp_template' &&
					params.postId === 'twentytwentythree//home',
			},
		],
		footer: {
			...useLink( {
				postType: 'wp_template',
				postId: undefined,
			} ),
			children: __( 'Manage all templates' ),
			'aria-pressed':
				params.postType === 'wp_template' && ! params.postId,
		},
	};

	return (
		<NavigatorScreen path="/templates">
			<VStack spacing={ 6 }>
				<div className="edit-site-sidebar-navigation-root__header">
					<NavigatorBackButton
						as={ SidebarNavigationTitle }
						{ ...menu.header }
					/>
				</div>
				<ItemGroup>
					{ menu.items.map( ( item, index ) => (
						<SidebarNavigationItem { ...item } key={ index } />
					) ) }
				</ItemGroup>
				<SidebarNavigationItem { ...menu.footer } />
			</VStack>
		</NavigatorScreen>
	);
}
