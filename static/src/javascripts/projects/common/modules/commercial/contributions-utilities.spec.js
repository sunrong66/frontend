// @flow

import { overwriteMvtCookie } from 'common/modules/analytics/mvt-cookie';
import {
    buildConfiguredEpicTestFromJson,
    makeEpicABTest,
} from './contributions-utilities';
import { setGeolocation } from '../../../../lib/geolocation';
import config from '../../../../lib/config';

jest.mock('lib/raven');
jest.mock('ophan/ng', () => null);

// const rawTest = {
//     name: 'my_test',
//     isOn: true,
//     locations: ['UnitedStates', 'Australia'],
//     tagIds: ['football/football'],
//     sections: [],
//     excludedTagIds: [],
//     excludedSections: [],
//     alwaysAsk: false,
//     isLiveBlog: false,
//     hasCountryName: false,
//     variants: [
//         {
//             name: 'Control',
//             heading: 'This was made using the new tool!',
//             paragraphs: ['testing testing', 'this is a test'],
//             highlightedText: 'Some highlighted text',
//             footer: '',
//             showTicker: false,
//             showReminderFields: null,
//             backgroundImageUrl: '',
//             maxViews: {
//                 maxViewsDays: 30,
//                 maxViewsCount: 4,
//                 minDaysBetweenViews: 0,
//             },
//         },
//     ],
//     highPriority: false,
//     useLocalViewLog: false,
//     articlesViewedSettings: {
//         minViews: 5,
//         maxViews: 10,
//         periodInWeeks: 4,
//     },
// };

// describe('buildConfiguredEpicTestFromJson', () => {
//     it('Parses and constructs an epic test', () => {
//         const test: InitEpicABTest = buildConfiguredEpicTestFromJson(rawTest);
//         expect(test.id).toBe('my_test');
//         expect(test.useLocalViewLog).toBe(false);
//         expect(test.userCohort).toBe('AllNonSupporters');
//
//         expect(test.articlesViewedSettings).toEqual({
//             minViews: 5,
//             maxViews: 10,
//             count: 0,
//         });
//
//         const variant: InitEpicABTestVariant = test.variants[0];
//         expect(variant.id).toBe('Control');
//         expect(variant.countryGroups).toEqual(['UnitedStates', 'Australia']);
//         expect(variant.tagIds).toEqual(['football/football']);
//         expect(variant.classNames).toEqual([
//             'contributions__epic--my_test',
//             'contributions__epic--my_test-Control',
//         ]);
//         expect(variant.copy).toEqual({
//             heading: 'This was made using the new tool!',
//             paragraphs: ['testing testing', 'this is a test'],
//             footer: [],
//             highlightedText: 'Some highlighted text',
//         });
//
//         expect(variant.deploymentRules).toEqual({
//             days: 30,
//             count: 4,
//             minDaysBetweenViews: 0,
//         });
//     });
// });

const setViewLog = (log: any): void => {
    window.localStorage.setItem('gu.contributions.views', log);
};

const setPageMeta = (section: string, keywordIDs: Array<string>) => {
    config.set('page.section', section);
    config.set('page.keywordIds', keywordIDs);
};

const setMVTID = (ID: number) => {
    overwriteMvtCookie(ID);
};

const setCountryCode = (code: string) => {
    setGeolocation(code);
};

const setTracking = (tracking: any) => {
    setViewLog(tracking.epicViewLog);
    setPageMeta(tracking.sectionName, tracking.tags);
    setMVTID(tracking.mvtId);
    setCountryCode(tracking.countryCode);
};

const annoyingTest = {
    name: '2020-03-21_Global_Epic_round6__with_article_count',
    isOn: true,
    locations: [
        'AUDCountries',
        'Canada',
        'EURCountries',
        'NZDCountries',
        'GBPCountries',
        'International',
    ],
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: false,
    maxViews: {
        maxViewsCount: 4,
        maxViewsDays: 30,
        minDaysBetweenViews: 0,
    },
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    variants: [
        {
            name: 'Control',
            heading: 'Since you’re here...',
            paragraphs: [
                '… we’re asking readers like you to make a contribution in support of our open, independent journalism. In these extraordinary times, when anxiety and uncertainty abound, the Guardian’s measured, authoritative reporting has never been so vital. As 2020 ensues, we will remain with you, delivering quality journalism so we can all make critical decisions about our lives, health and security – based on fact, not fiction. ',
                '',
                'You’ve read %%ARTICLE_COUNT%% articles in the last four months. We believe every one of us deserves equal access to accurate news and calm explanation. So, unlike many others, we made a different choice: to keep Guardian journalism open for all, regardless of where they live or what they can afford to pay. This would not be possible without the generosity of readers, who now support our work from 180 countries around the world.',
                '',
                'We have upheld our editorial independence in the face of the disintegration of traditional media – with social platforms giving rise to misinformation, the seemingly unstoppable rise of big tech and independent voices being squashed by commercial ownership. The Guardian’s independence means we can set our own agenda and voice our own opinions. Our journalism is free from commercial and political bias – never influenced by billionaire owners or shareholders. This makes us different. It means we can challenge the powerful without fear and give a voice to those less heard.',
                '',
                'Your financial support has meant we can keep investigating, disentangling and interrogating. It has protected our independence, which has never been so critical. We are so grateful. ',
                '',
                'We need your support so we can keep delivering quality journalism that’s open and independent. And that is here for the long term. Every reader contribution, however big or small, is so valuable.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.',
            showTicker: false,
            cta: {
                text: 'Support The Guardian',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
        },
        {
            name: 'v2_kv_language',
            heading: "Since you're here...",
            paragraphs: [
                '… we’re asking readers like you to make a contribution in support of our open, independent journalism. In these frightening and uncertain times, the expertise, scientific knowledge and careful judgment in our reporting has never been so vital. No matter how unsettled the future feels, we will remain with you, delivering high quality news so we can all make critical decisions about our lives, health and security. Together we can find a way through this.',
                '',
                'You’ve read %%ARTICLE_COUNT%% articles in the last four months. We believe every one of us deserves equal access to accurate news and calm explanation. So, unlike many others, we made a different choice: to keep Guardian journalism open for all, regardless of where they live or what they can afford to pay. This would not be possible without the generosity of readers, who now support our work from 180 countries around the world.',
                '',
                'We have upheld our editorial independence in the face of the disintegration of traditional media – with social platforms giving rise to misinformation, the seemingly unstoppable rise of big tech and independent voices being squashed by commercial ownership. The Guardian’s independence means we can set our own agenda and voice our own opinions. Our journalism is free from commercial and political bias – never influenced by billionaire owners or shareholders. This makes us different. It means we can challenge the powerful without fear and give a voice to those less heard. ',
                '',
                'Your financial support has meant we can keep investigating, disentangling and interrogating. It has protected our independence, which has never been so critical. We are so grateful. ',
                '',
                'We need your support so we can keep delivering quality journalism that’s open and independent. And that is here for the long term. Every reader contribution, however big or small, is so valuable.',
            ],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.',
            showTicker: false,
            cta: {
                text: 'Support The Guardian',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
        },
    ],
    highPriority: false,
    useLocalViewLog: false,
    articlesViewedSettings: {
        minViews: 5,
        periodInWeeks: 52,
    },
};

const annoyingTracking = {
    contentType: 'Article',
    sectionName: 'us-news',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [
        { id: 'us-news/donaldtrump', type: 'Keyword', title: 'Donald Trump' },
        { id: 'us-news/us-news', type: 'Keyword', title: 'US news' },
        { id: 'world/world', type: 'Keyword', title: 'World news' },
        {
            id: 'world/coronavirus-outbreak',
            type: 'Keyword',
            title: 'Coronavirus outbreak',
        },
        { id: 'us-news/us-politics', type: 'Keyword', title: 'US politics' },
    ],
    countryCode: 'ZA',
    showSupportMessaging: true,
    isRecurringContributor: false,
    lastOneOffContributionDate: null,
    mvtId: 260063,
    epicViewLog: [
        { date: 1528668886732, testId: 'AcquisitionsEpicNativeVsDfp' },
        { date: 1528668934231, testId: 'AcquisitionsEpicNativeVsDfp' },
        {
            date: 1529445575021,
            testId: 'AcquisitionsEpicFromGoogleDocOneVariant',
        },
        {
            date: 1559771467344,
            testId: '2019-05-31_contribs_global_epic_control2',
        },
        {
            date: 1559771537101,
            testId: '2019-05-31_contribs_global_epic_control2',
        },
        {
            date: 1559771696614,
            testId: '2019-05-31_contribs_global_epic_control2',
        },
        {
            date: 1559771743818,
            testId: '2019-05-31_contribs_global_epic_control2',
        },
        { date: 1579206669255, testId: 'ContributionsEpicAskFourEarning' },
        { date: 1579206980557, testId: 'ContributionsEpicAskFourEarning' },
        { date: 1579207032648, testId: 'ContributionsEpicAskFourEarning' },
        { date: 1579555877529, testId: 'ContributionsEpicAskFourEarning' },
    ],
    weeklyArticleHistory: [
        { week: 18343, count: 3 },
        { week: 18344, count: 4 },
        { week: 18336, count: 5 },
        { week: 18281, count: 4 },
        { week: 18273, count: 7 },
    ],
};

describe('nic debug thing', () => {
    it('fails on this test', () => {
        setTracking(annoyingTracking);
        const t = buildConfiguredEpicTestFromJson(annoyingTest);
        const abTest = makeEpicABTest(t);
        expect(abTest.canRun()).toBe(false);
    });
});
