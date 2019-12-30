#!/bin/bash

find src -name "*vue" | while read FN; do
  sed -i -e "s@https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/master/@https://github.com/oarepo/invenio-oarepo-ui-quasar/tree/invenio-3.2/@g" $FN
done
