export default class Contact {
  constructor(contact){
    const {
      type,
      info
    } = { ...contact };
    this.type = type || '';
    this.info = info || '';
  }
  get = () => Object.keys(this).reduce((acc, key) => typeof this[key] === 'function' ? { ...acc } : { ...acc, [key]: this[key] }, {});
  getTypes = () => [
    { id: 'phone',
      label: 'Phone',
      placeholder: 'Eg: +91-9876543210',
      errorText: 'Phone number cannot be empty'
    },
    { id: 'mail',
      label: 'Email',
      placeholder: 'Eg: someone@email.com',
      errorText: 'Email address cannot be empty'
    },
    { id: 'global',
      label: 'Website',
      placeholder: 'Eg: wwww.theobiman.com',
      errorText: 'Website cannot be empty'
    },
    { id: 'facebook',
      label: 'Facebook',
      placeholder: 'Eg: theobiman',
      errorText: 'Facebook page cannot be empty'
    },
    { id: 'instagram',
      label: 'Instagram',
      placeholder: 'Eg: @theobiman',
      errorText: 'Instagram handle cannot be empty'
    },
    { id: 'twitter',
      label: 'Twitter',
      placeholder: 'Eg: @theobiman',
      errorText: 'Twitter cannot be empty'
    }
  ];
  set = (key, value) => {
    this[key] = value;
    return this;
  }
  setType = type => this.set('type', type);
  setInfo = info => this.set('info', info);
  validate = () => {
    const typeErrors = !this.getTypes().map(({ id }) => id).includes(this.type) ? { type: [ 'Type of contact cannot be empty' ] } : {};
    const infoErrors = !this.info && !Object.keys(typeErrors).length ? { info: [ this.getTypes().filter(({ id }) => id === this.type)[0].errorText ] } : {}
    return { ...typeErrors, ...infoErrors };
  }
}