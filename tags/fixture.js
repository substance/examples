var makeFixture = function(tx) {
	var body = tx.get('body');

  tx.create({
    id: 'h1',
    type: 'heading',
    level: 1,
    content: 'CI'
  });
  body.show('h1');

  tx.create({
    id: 'h2',
    type: 'heading',
    level: 2,
    content: 'from the Autobiography of Benvenuto Cellini'
  });
  body.show('h2');

  tx.create({
    id: 'p1',
    type: 'paragraph',
    content: "While I was engaged in prosecuting my affairs with so much vigour, there arrived a letter sent post-haste to me by the Cardinal of Ferrara, which ran as follows:-"
  });
  body.show('p1');

  tx.create({
    id: 'q1',
    type: 'blockquote',
    content: "'Benvenuto, our dear friend,-During these last days the most Christian King here made mention of you, and said that he should like to have you in his service. Whereto I answered that you had promised me, whenever I sent for you to serve his Majesty, that you would come at once. His Majesty then answered:It is my will that provision for his journey, according to his merits, should be sent him; and immediately ordered his Admiral to make me out an order for one thousand golden crowns upon the treasurer of the Exchequer. The Cardinal de Gaddi, who was present at this conversation, advanced immediately, and told his Majesty that it was not necessary to make these dispositions, seeing that he had sent you money enough, and that you were already on the journey. If then, as I think probable, the facts are quite contrary to those assertions of Cardinal Gaddi, reply to me without delay upon the receipt of this letter; for I will undertake to gather up the fallen thread, and have the promised money given you by this magnanimous King.'"
  });
  body.show('q1');

  tx.create({
    id: 'p2',
    type: 'paragraph',
    content: "Now let the world take notice, and all the folk that dwell on it, what power malignant stars with adverse fortune exercise upon us human beings! I had not spoken twice in my lifetime to that little simpleton of a Cardinal de Gaddi; nor do I think that he meant by this bumptiousness of his to do me any harm, but only, through lightheadedness and senseless folly, to make it seem as though he also held the affairs of artists, whom the King was wanting, under his own personal supervision, just as the Cardinal of Ferrara did. But afterwards he was so stupid as not to tell me anything at all about the matter; elsewise, it is certain that my wish to shield a silly mannikin from reproach, if only for our countrys sake, would have made me find out some excuse to mend the bungling of his foolish self-conceit."
  });
  body.show('p2');

  tx.create({
    id: 'p3',
    type: 'paragraph',
    content: "Immediately upon the receipt of Cardinal Ferraras letter, I answered that about Cardinal de Gaddi I knew absolutely nothing, and that even if he had made overtures of that kind to me, I should not have left Italy without informing his most reverend lordship. I also said that I had more to do in Rome than at any previous time; but that if his most Christian Majesty made sign of wanting me, one word of his, communicated by so great a prince as his most reverend lordship, would suffice to make me set off upon the spot, leaving all other concerns to take their chance."
  });
  body.show('p3');

  tx.create({
    id: 'p4',
    type: 'paragraph',
    content: "After I had sent my letter, that traitor, the Perugian workman, devised a piece of malice against me, which succeeded at once, owing to the avarice of Pope Paolo da Farnese, but also far more to that of his bastard, who was then called Duke of Castro. The fellow in question informed one of Signor Pier Luigis secretaries that, having been with me as workman several years, he was acquainted with all my affairs, on the strength of which he gave his word to Signor Pier Luigi that I was worth more than eighty thousand ducats, and that the greater part of this property consisted in jewels, which jewels belonged to the Church, and that I had stolen them in Castel Sant Angelo during the sack of Rome, and that all they had to do was to catch me on the spot with secrecy."
  });
  body.show('p4');

  tx.create({
    id: 'p5',
    type: 'paragraph',
    content: "It so happened that I had been at work one morning, more than three hours before daybreak, upon the trousseau of the bride I mentioned; then, while my shop was being opened and swept out, I put my cape on to go abroad and take the air. Directing my steps along the Strada Giulia, I turned into Chiavica, and at this corner Crespino, the Bargello, with all his constables, made up to me, and said: You are the Popes prisoner. I answered: Crespino, you have mistaken your man. No, said Crespino, you are the artist Benvenuto, and I know you well, and I have to take you to the Castle of Sant Angelo, where lords go, and men of accomplishments, your peers. Upon that four of his under-officers rushed on me, and would have seized by force a dagger which I wore, and some rings I carried on my finger; but Crespino rebuked them: Not a man of you shall touch him: it is quite enough if you perform your duty, and see that he does not escape me. Then he came up, and begged me with words of courtesy to surrender my arms. While I was engaged in doing this, it crossed my mind that exactly on that very spot I had assassinated Pompeo. They took me straightway to castle, and locked me in an upper chamber in the keep. This was the first time that I ever smelt a prison up to the age I then had of thirty-seven years."
  });
  body.show('p5');
};

module.exports = makeFixture;