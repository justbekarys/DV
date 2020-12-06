#!/usr/bin/env python
# coding: utf-8

# <h1>Table of Contents<span class="tocSkip"></span></h1>
# <div class="toc"><ul class="toc-item"></ul></div>

# In[72]:


from nltk.corpus import wordnet as wn


# In[84]:


def closure_graph(synset,fn):
    seen = set()
    node = set()
    edge = list()
    
    
    def recurse(s):
        if not s in seen:
            seen.add(s)
            print(s.lemma_names('eng')[0])
            node.add(s.lemma_names('eng')[0])
            for s1 in fn(s):
                
                node.add(s1.lemma_names('eng')[0])
                edge.append({"source":s.lemma_names('eng')[0],"target":s1.lemma_names('eng')[0]})
                recurse(s1)
    recurse(synset)
    return (list(node),edge)


# In[85]:


import json

dog = wn.synset('dog.n.01')
graph = closure_graph(dog,lambda s: s.hypernyms())
with open("wordnet.json","w") as fh:
    json.dump({"node":graph[0],"edge":graph[1]},fh)
print(graph)


# In[91]:


animal = wn.synset('animal.n.01')
print(animal.lemma_names('eng'))


# In[ ]:




