import { atom } from 'recoil';

export const applicant = atom({
    key: 'applicantInfo',
    default: {},
});

export const status = atom ({
    key: 'status',
    default: [
        {
            key: 'recieved',
            displayValue: 'Recieved',
            completed: false,
        },
        {
            key: 'assigned',
            displayValue: 'Assigned',
            completed: false,
          
        },
        {
            key: 'reviewed',
            displayValue: 'Reviewed',
            completed: false,
          
        },
        {
            key: 'decision',
            displayValue: 'Decision',
            completed: false,
            action: {
                type: 'decision',
                decision: 'none',
                options: [
                    {
                        key: 'accepted',
                        displayValue:'Accept',
                        class: 'icon-checked bacground-color-green',
                    },
                    {
                        key: 'rejected',
                        displayValue:'Reject',
                        class: 'icon-remove bacground-color-red',
                    }
                ],
            }
        },
      ],
})