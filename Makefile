SRC_DIR = src
TEST_DIR = test
MAIN_DIR = ${SRC_DIR}/main/public/js
MODULE_DIR = ${MAIN_DIR}/modules
LIB_DIR = ${MAIN_DIR}/lib

PREFIX = .
DIST_DIR = ${PREFIX}/dist

CLIQUE = ${DIST_DIR}/clique.js

BASE_FILES = ${MODULE_DIR}/core.js

DEPENDENCIES = ${LIB_DIR}/sylvester.src.js

MODULES = ${MODULE_DIR}/header.js\
	${DEPENDENCIES}\
	${MODULE_DIR}/intro.js\
	${BASE_FILES}\
	${MODULE_DIR}/outro.js

all: core

core: clique
	@@echo "Clique build complete."

${DIST_DIR}:
	@@mkdir -p ${DIST_DIR}

clique: ${CLIQUE}

${CLIQUE}: ${MODULES} | ${DIST_DIR}
	@@echo "Building" ${CLIQUE}

	@@cat ${MODULES} | \
		sed 's/.function..clique...{//' | \
		sed 's/}...clique..;//' > \
		${CLIQUE}

clean:
	@@echo "Removing Distriution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}