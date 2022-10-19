/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalVStack as VStack,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorBackButton as NavigatorBackButton,
} from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { layout } from '@wordpress/icons';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import { useLink } from '../routes/link';
import SidebarNavigationTitle from '../sidebar-navigation-title';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { useLocation } from '../routes';

const Item = ( { item } ) => {
	const linkInfo = useLink( item.params );
	if ( item.params ) {
		delete item.params;
		item = {
			...item,
			...linkInfo,
		};
	}
	return <SidebarNavigationItem { ...item } />;
};

export default function SidebarNavigationScreenTemplates() {
	const { params } = useLocation();
	const { records: templates, isResolving: isLoading } = useEntityRecords(
		'postType',
		'wp_template',
		{
			per_page: -1,
		}
	);

	let items = [];
	if ( isLoading ) {
		items = [
			{
				children: __( 'Loading templates' ),
			},
		];
	} else if ( ! templates && ! isLoading ) {
		items = [
			{
				children: __( 'No templates found' ),
			},
		];
	} else {
		items = templates?.map( ( template ) => ( {
			params: {
				postType: 'wp_template',
				postId: template.id,
			},
			icon: layout,
			children: decodeEntities(
				template.title?.rendered || template.slug
			),
		} ) );
	}

	const menu = {
		header: {
			parentTitle: __( 'Design' ),
			title: __( 'Templates' ),
		},
		items,
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
						<Item item={ item } key={ index } />
					) ) }
				</ItemGroup>
				<SidebarNavigationItem { ...menu.footer } />
			</VStack>
		</NavigatorScreen>
	);
}
