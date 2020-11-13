# Jupyter Datascience Notebook for python - customized by Saagie
                                         
This Docker image officially available on [Saagie's DockerHub](https://hub.docker.com/r/saagie/jupyter-python-nbk) is based on official [jupyter/minimal-notebook:f9e77e3ddd6f](https://hub.docker.com/r/jupyter/minimal-notebook/) image.
                                         
It is specially designed to run on Saagie's platform v2.

## Build the image

### Using gradle build 

This gradle build is based on [Saagie's technology plugin](https://github.com/saagie/technologies-plugin) 

Be aware that this is a 2 steps builds. First we build jupyter-minimal which is the official image customized for Saagie with no addtionnal libraries. Then we build jupyter-base plugin with all the libs listed below.

To build the project go up 3 directories to be at the root of this project.
Then run :

```
./gradlew :jupyter-base:buildImage
```

If you want to test the image you can run :
```
./gradlew :jupyter-base:testImage
```

### Using docker commands

First go to context/version sub-directory :

```
cd jupyter-minimal
```

Then run the following command:
```
docker build -t saagie/jupyter-python-nbk:v2-minmal .
```
This will build the minimal image.

After go to context/version sub-directory :

```
cd ../jupyter-base
```

Then run the following command:
```
docker build --build-arg BASE_CONTAINER=saagie/jupyter-python-nbk:v2-minimal  -t saagie/jupyter-python-nbk:v2-app .
```

     
## Run Jupyter container

This container is supposed to be run on Saagie's platform.

Official documentation is available here : [Saagie's official documentation](https://docs.saagie.io/product/latest/sdk/index.html)

### On premise / your local server

Anyway, it is possible mainly for development and tests to run this image outside Saagie.
Please note that Saagie won't provide any support regarding images launched outside it's platform.

Simply run: 
```
docker run --rm -it -p 18888:8888 --name jupyter -v $PWD/jupyter-workdir:/notebooks-dir saagie/jupyter-python-nbk:v2
```
 - Port `8888` should be mapped to the one you will be using on host side (here `18888`).
You can also decide to share a volume to be able to persist or load from host some notebooks eg :
  `-v $PWD/jupyter-workdir:/notebooks-dir`

Then you'll be able to access Jupyter at http://localhost:18888 
Mounting a volume to `/notebooks-dir` directory allows you to persist Jupyter notebooks. Meaning the `-v $PWD/jupyter-workdir:/notebooks-dir` part is optional but can be useful.

 
## Libraries :
Here's a non exhaustive, by usage, list of libs added to the jupyter official image  : 

	* Data Processing
		* numpy
    	* scipy
		* pandas

	* Machine Learning
    	* sklearn
		* keras
    	* pybrain (python 2 only)
    	* statsmodel
		* networkx

	* Data Visualisation
		* skimage
		* matplotlib
    	* bokeh
    	* mpld3
    	* folium

	* Database connection
		* pyodbc
    	* hdfs **
		* impyla
		* ibis-framework
		* SQLAlchemy
		* pymongo

	* Utils
    	* ipywidgets
		* fiona
 		* shapely

Here's the whole list :

    addok
    apiclient
    auto-sklearn
    beautifulsoup4
    bokeh
    bs4
    confluent-kafka
    crypto
    cython
    django
    dryscrape
    elasticsearch
    excel
    fastparquet
    fiona
    folium
    gensim
    geopandas
    geopy
    graphviz
    h5py
    hdf5
    hdfs[avro,dataframe,kerberos]
    ibis-framework
    imbalanced-learn
    impyla
    ipywidgets
    jellyfish
    joblib
    kafka-python
    keras
    lime
    llvmlite
    lxml
    matplotlib
    mpld3
    mysql-connector-python
    neo4j-driver
    networkx
    nltk
    numba
    numpy
    opencv-python
    openpyxl
    pandas
    pdfminer.six
    pillow
    protobuf
    psycopg2
    pybrain
    pycrypto
    pycurl
    pycurl
    pydotplus
    pymongo
    pyodbc
    pyshp
    pytesseract
    python-hdfs
    python-levenshtein
    requests-kerberos
    scikit-image
    scikit-learn
    scipy
    scrapy
    seaborn
    shap
    shapely
    simplejson
    six
    spacy
    SQLAlchemy
    statsmodels
    tabula-py
    tensorflow
    tensorflow-gpu
    textract
    Theano
    thrift-sasl
    tika
    tokenizer
    torch
    torchvision
    tpot
    umap-learn
    wand
    xgboost
    xlwt


## Install libraries with :

You can still install your own libraries if you want : 

### For python 3
	!pip install libraryName

### For python 2
	!pip2 install libraryName
