var _ = require('substance/helpers');

// HACK: remember previous selection so we can check if a selection has changed
var prevSelection;

var stateHandlers = {

  handleSelectionChange: function(app, sel, surface) {
    var contentContainer = surface.getContainer();
    var doc = surface.getDocument();

    if (sel.equals(prevSelection)) {
      return;
    }
    prevSelection = sel;

    if (sel.isNull() || !sel.isPropertySelection() || !sel.isCollapsed()) return false;
    if (surface.getContainerId() !== "body") return false;

    // From topics panel
    // ---------------
    //

    var annotations = doc.annotationIndex.get(sel.getPath(), sel.getStartOffset(), sel.getEndOffset(), "topic_citation");

    if (annotations.length > 0) {
      var topicCitation = annotations[0];
      app.setState({
        contextId: "editTopicCitation",
        topicCitationId: topicCitation.id,
        noScroll: true
      });
      return true;
    }

    // Comments module
    // ---------------
    //

    // var annos = doc.getContainerAnnotationsForSelection(sel, contentContainer, {
    //   type: "comment"
    // });

    // var activeComment = annos[0];
    // if (activeComment) {
    //   app.replaceState({
    //     contextId: "show-comment",
    //     commentId: activeComment.id,
    //     noScroll: true
    //   });
    //   return true;
    // }

    // if (sel.isCollapsed() && app.state.contextId !== "editSubjectReference") {
    //   app.replaceState({
    //     contextId: 'metadata'
    //   });
    //   return true;
    // }
  },

  handleStateChange: function(app, newState, oldState) {
    var doc = app.getDocument();
    

    function getActiveAnnotations(state) {
      console.log('getActiveAnnotations', state);
      if (!state) return [];

      // Subjects-specific
      // --------------------
      //
      // When a subject has been clicked in the subjects panel
      // if (state.contextId === "editSubjectReference" && state.subjectReferenceId) {
      //   return [ doc.get(state.subjectReferenceId) ];
      // }
      // if (state.contextId === "subjects" && state.subjectId) {
      //   return _.map(doc.subjects.getReferencesForSubject(state.subjectId), function(id) {
      //     return doc.get(id);
      //   });
      // }
      
      // Entities-specific
      // --------------------
      //
      // When a subject has been clicked in the subjects panel

      // Let the extension handle which nodes should be highlighted
      if (state.contextId === "topics" && state.topicId) {
        // Use reference handler
        return _.map(doc.entityReferencesIndex.get(state.topicId));
      } else if (state.topicCitationId) {
        console.log('topicCitationId', state.topicCitationId);
        return [ doc.get(state.topicCitationId) ];
      }
      return [];
    }

    var oldActiveAnnos = _.compact(getActiveAnnotations(oldState));
    var activeAnnos = getActiveAnnotations(newState);
    if (oldActiveAnnos.length || activeAnnos.length) {
      var tmp = _.without(oldActiveAnnos, activeAnnos);
      activeAnnos = _.without(activeAnnos, oldActiveAnnos);
      oldActiveAnnos = tmp;

      _.each(oldActiveAnnos, function(anno) {
        anno.setActive(false);
      });
      _.each(activeAnnos, function(anno) {
        console.log('yo', anno.id);
        anno.setActive(true);
      });
      return true;
    } else {
      return false;
    }
  }
};

module.exports = stateHandlers;