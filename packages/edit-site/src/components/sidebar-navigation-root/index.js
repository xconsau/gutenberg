/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalVStack as VStack,
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalNavigatorBackButton as NavigatorBackButton,
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
	const root = {
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
				path: '/templates',
				...useLink( {
					postType: 'wp_template',
					postId: 'twentytwentythree//index',
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
	const templates = {
		titleSection: {
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
		<NavigatorProvider initialPath="/">
			<NavigatorScreen path="/">
				<VStack spacing={ 6 }>
					<div className="edit-site-sidebar-navigation-root__header">
						<SidebarNavigationTitle { ...root.titleSection } />
					</div>
					<ItemGroup>
						{ root.items.map( ( item, index ) => {
							if ( item?.path ) {
								return (
									<NavigatorButton
										as={ SidebarNavigationItem }
										{ ...item }
										key={ index }
									/>
								);
							}
							return (
								<SidebarNavigationItem
									{ ...item }
									key={ index }
								/>
							);
						} ) }
					</ItemGroup>
				</VStack>
			</NavigatorScreen>

			<NavigatorScreen path="/templates">
				<VStack spacing={ 6 }>
					<div className="edit-site-sidebar-navigation-root__header">
						<NavigatorBackButton
							as={ SidebarNavigationTitle }
							{ ...templates.titleSection }
						/>
					</div>
					<ItemGroup>
						{ templates.items.map( ( item, index ) => (
							<SidebarNavigationItem { ...item } key={ index } />
						) ) }
					</ItemGroup>
					<SidebarNavigationItem { ...templates.footer } />
				</VStack>
			</NavigatorScreen>
		</NavigatorProvider>
	);
}
