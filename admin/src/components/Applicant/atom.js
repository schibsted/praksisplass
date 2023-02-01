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
                options: [
                    {
                        key: 'accept',
                        displayValue:'Accept',
                        iconClass: 'icon-checked bacground-color-green',
                    },
                    {
                        key: 'reject',
                        displayValue:'Reject',
                        iconClass: 'radio_button_unchecked',
                    }
                ],
            }
        },
      ],
})