from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Campaign, Category, Tag, Note

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(username = 'Ian', email = 'ian@aa.io', password='password')
  javier = User(username = 'Javier', email = 'javier@aa.io', password='password')
  dean = User(username = 'Dean', email = 'dean@aa.io', password='password')
  angela = User(username = 'Angela', email = 'angela@aa.io', password='password')
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password='password')
  alissa = User(username = 'Alissa', email = 'alissa@aa.io', password='password')

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)

  sessions = Category(name='Sessions', description='a description')
  pcs = Category(name='Player Characters', description='a description')
  npcs = Category(name='NPCs', description='a description')
  locale = Category(name='Locales', description='a description')
  other = Category(name='Other', description='a description')

  db.session.add(sessions)
  db.session.add(pcs)
  db.session.add(npcs)
  db.session.add(locale)
  db.session.add(other)

  lmop = Campaign(title='Lost Mine of Phandelver', description='A great introduction to the game', user_id=1)
  rotfm = Campaign(title='Rime of the Frost Maiden', description='Hope you like frozen food', user_id=1)

  db.session.add(lmop)
  db.session.add(rotfm)

  s1 = Tag(name='#Session-1', campaign_id=1, category_id=1 )
  ds = Tag(name='#Deathshadow', campaign_id=1, category_id=2 )
  bob = Tag(name='#Boblin', campaign_id=1, category_id=3 )
  tne = Tag(name='#TheNaughtyElf', campaign_id=1, category_id=4 )
  tcm = Tag(name='#thechickensmaw', campaign_id=1, category_id=4 )

  db.session.add(s1)
  db.session.add(ds)
  db.session.add(bob)
  db.session.add(tne)
  db.session.add(tcm)

  n1 = Note(content='#Session-1 #Deathshadow wakes up hungover in #TheNaughtyElf tavern.  He is currently under the poisoned condition')
  n2 = Note(content='#Session-1 #Deathshadow owes 5 gold to the innkeeper of #thenaughtyelf')
  n3 = Note(content='#Session-1 #Deathshadow learns he can earn 10 gold if he kills any monsters in #thechickensmaw, the caverns behind town')
  n4 = Note(content='#Session-1 #thechickensmaw contains 1d4 goblins edit:(1 goblin named Boblin)')
  n5 = Note(content='#Session-1 #Deathshadow rolls a 1 sneaking into #thechickensmaw and trips over a sleeping #boblin')
  n6 = Note(content='#Session-1 #boblin crits on #deathshadow and stabs him in the heart.  RIP Deathshadow')

  db.session.add(n1)
  db.session.add(n2)
  db.session.add(n3)
  db.session.add(n4)
  db.session.add(n5)
  db.session.add(n6)

  db.session.commit()
