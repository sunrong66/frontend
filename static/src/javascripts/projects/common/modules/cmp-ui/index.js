// @flow
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/lib/ConsentManagementPlatform';
import React from 'react';
import ReactDOM from 'react-dom';

export const init = (forceModal: boolean) => {
    const container = document.createElement('div');
    container.id = 'cmpContainer';

    const props: {
        onClose: () => void,
        source: string,
        variant?: string,
        fontFamilies: {
            headlineSerif: string,
            bodySerif: string,
            bodySans: string,
        },
        forceModal: boolean,
    } = {
        onClose: () => {
            ReactDOM.unmountComponentAtNode(container);
        },
        source: 'www',
        fontFamilies: {
            headlineSerif: "'Guardian Egyptian Web', Georgia, serif",
            bodySerif: "'Guardian Text Egyptian Web', Georgia, serif",
            bodySans:
                "'Guardian Text Sans Web', Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
        },
        variant: 'CommercialCmpUiBannerModal-variant',
        forceModal,
    };

    if (document.body) {
        document.body.appendChild(container);
    }

    ReactDOM.render(<ConsentManagementPlatform {...props} />, container);
};