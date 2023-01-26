import { atom } from 'recoil';

export const schools = atom({
    key: 'schools',
    default: []
});

export const counties = atom ({
    key: 'counties',
    default: [],
})

export const applicants = atom ({
    key: 'applicants',
    default: [],
})

export const query = atom ({
    key: 'query',
    default: '',
})

export const filteredApplicants = atom ({
    key: 'filteredApplicants',
    default: [],
})

export const subjects = atom ({
    key: 'subjects',
    default: [],
})