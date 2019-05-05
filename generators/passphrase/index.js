const Generator = require('yeoman-generator');
const fs = require('fs-extra');

module.exports = class extends Generator {
  prompting() {
    const questions = [{
      type: 'password',
      name: 'passphrase',
      message: 'Enter your passphrase:',
      validate: d => d.length > 6 ? true : 'Need a passphrase of at least 6 characters. Try again.',
    }];

    return this.prompt(questions).then((answers) => {
      this.passphrase = ((answers.passphrase) + 'abcdefghijklmnopqrstuvwxyz').substring(0, 32);
    });
  }

  writing() {
    fs.appendFileSync(
      this.destinationPath('.env'), `PASSPHRASE=${this.passphrase}\n`);
    this.composeWith(require.resolve('../keys'), {
      passphrase: this.passphrase,
    });
    this.composeWith(require.resolve('../github'), {
      passphrase: this.passphrase,
    });
  }
};
