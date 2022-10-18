/**
 * WordPress dependencies
 */
import { __experimentalNavigatorProvider as NavigatorProvider } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useLocation } from '../routes';
import SidebarNavigationScreenMain from './screen-main';
import SidebarNavigationScreenTemplates from './screen-templates';

export default function SidebarNavigationRoot() {
	const { params } = useLocation();
	return (
		<NavigatorProvider initialPath="/">
			<SidebarNavigationScreenMain params={ params } />
			<SidebarNavigationScreenTemplates params={ params } />
		</NavigatorProvider>
	);
}
