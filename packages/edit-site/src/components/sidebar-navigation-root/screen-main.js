/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalVStack as VStack,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorButton as NavigatorButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { globe, layout, symbolFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { useLink } from '../routes/link';
import SidebarNavigationTitle from '../sidebar-navigation-title';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { useLocation } from '../routes';

export default function SidebarNavigationScreenMain() {
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

	return (
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
									withChevron={ true }
									key={ index }
								/>
							);
						}
						return (
							<SidebarNavigationItem { ...item } key={ index } />
						);
					} ) }
				</ItemGroup>
			</VStack>
		</NavigatorScreen>
	);
}
